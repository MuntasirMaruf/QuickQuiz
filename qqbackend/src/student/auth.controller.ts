import { Controller, Post, Body, Session, UsePipes, ValidationPipe, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Session() session: Record<string, any>) {
    const user = await this.authService.validateUser(loginDto.username, loginDto.password);

    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }
    session.user = user;
    return "Login successful";
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('logout')
  async logout(@Body() loginDto: LoginDto, @Session() session: Record<string, any>) {

    const user = await this.authService.validateUser(loginDto.username, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }
    session.destroy((err) => {
      if (err) throw err;
    });
    return { message: 'Logged out successfully' };
  }
}
