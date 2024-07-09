import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { LoginDataDto } from './login.dto';
import { RegisterUserDto } from './register.dto';

@Controller('auth')
export class AuthController {
    static a = 0;
  constructor(private readonly authService: AuthService
  ) {}

  @Post('register')
  async registerUser(@Body() user: RegisterUserDto) {
    return await this.authService.registerUser(user);
  }

  @Get('verify')
  async verifyJWT(@Query('token') token: string) {
    return await this.authService.verifyUser(token);
  }

  @Post('login')
  async login(@Body() loginData: LoginDataDto,@Req() req: Request) { 
     let user= await this.authService.loginCheck(loginData.id, loginData.password);
     req.session.user = user;
    return "login success";
    
  }

  @Get('test')
  async testRedis(@Req() req: Request) {

    console.log(req.session.user)
    

  }
}
