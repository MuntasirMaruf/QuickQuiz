import { Controller, Post, Body, Session, UsePipes, ValidationPipe, UnauthorizedException, Get, Req, UseGuards, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { AdminJwtGuard } from './auths/admin_jwt.gaurd';
import { MailerService } from '@nestjs-modules/mailer';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
    private readonly mailerService: MailerService
  ) { }

  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Session() session: Record<string, any>) {
    if (session.student) {
      return { message: 'Already logged in', Code: 200 };
    }

    const student = await this.authService.validateStudent(loginDto.username, loginDto.password);

    if (!student) {
      throw new UnauthorizedException('Invalid username or password');
    }
    session.student = student;
    return { message: 'Logged in successfully', student, Code: 200 };
  }


  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('logout')
  async logout(@Session() session: Record<string, any>) {
    return new Promise((resolve, reject) => {
      session.destroy(err => {
        if (err) reject(err);
        else resolve({ message: 'Logged out successfully', Code: 200 });
      });
    });
  }

  @Get('me')
  async me(@Session() session: Record<string, any>) {
    if (session.student) {
      return { loggedIn: true, student: session.student };
    } else {
      return { loggedIn: false };
    }
  }


  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('admin/login')
  async loginAdmin(@Body() loginDto: LoginDto) {

    return await this.authService.validateAdmin(loginDto.username, loginDto.password);
  }


  @UseGuards(AdminJwtGuard)
  @Get('profile')
  getProfile(@Req() req) {
    console.log(req.user);  // <-- this comes from request['user'] in the guard
    return req.user;
  }


  @Get('student/validate')
  validateStudent(
    @Query('username') username: string,
    @Query('password') password: string,
  ) {
    return this.authService.validateStudent(username, password);
  }

  @Post("student/send_otp")
  async sendOtp(
    @Body() body: { email: string },
    @Session() session: Record<string, any>
  ) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    session.otp = otp; // Store in session
    session.email = body.email;

    await this.mailerService.sendMail({
      to: body.email,
      subject: "Your OTP Code",
      template: "./otp", // optional template (see below)
      context: {
        otp,
      },
      text: `Your OTP code is: ${otp}`,
    });

    return { success: true, message: "OTP sent to your email." };
  }

  @Post("student/verify_otp")
  verifyOtp(
    @Body() body: { email: string; otp: string },
    @Session() session: Record<string, any>
  ) {
    if (session.email !== body.email) {
      return { verified: false, message: "Email mismatch." };
    }

    if (session.otp === body.otp) {
      delete session.otp;
      return { verified: true, message: "OTP verified successfully." };
    }

    return { verified: false, message: "Invalid OTP." };
  }
}

