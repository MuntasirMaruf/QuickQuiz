import { Controller, Post, Body, Session, UsePipes, ValidationPipe, UnauthorizedException, Get, Req, UseGuards, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { AdminJwtGuard } from './auths/admin_jwt.gaurd';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

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
}

