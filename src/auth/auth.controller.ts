import { Body, Controller, Get, HttpException, Param, Post, Query } from '@nestjs/common';
import { RegisterUserDto } from './register.dto';
import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async registerUser(@Body() user: RegisterUserDto) {
    await this.authService.registerUser(user);
    return '建立成功，請去信箱進行帳號驗證';
  }

  @Get('verify')
  async verifyJWT(@Query('token') token: string) {
    return await this.authService.verifyUser(token);
  }

  @Get('test')
  async testJWT() {
    return this.authService.generateJwtByUserId('aaaa');
  }
}
