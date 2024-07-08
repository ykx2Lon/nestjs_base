import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { Request } from 'express';
import { RedisProvider } from 'src/common/database/redis/redis.provider';
import { AuthService } from './auth.service';
import { LoginDataDto } from './login.dto';
import { RegisterUserDto } from './register.dto';

@Controller('auth')
export class AuthController {
    static a = 0;
  constructor(private readonly authService: AuthService, private readonly redisService:RedisProvider
  ) {}

  @Post('register')
  async registerUser(@Body() user: RegisterUserDto) {
    await this.authService.registerUser(user);
    return '建立成功，請去信箱進行帳號驗證';
  }

  @Get('verify')
  async verifyJWT(@Query('token') token: string) {
    return await this.authService.verifyUser(token);
  }

  @Post('login')
  async login(@Body() loginData: LoginDataDto,@Req() req: Request) {
    console.log(loginData)
    console.log(req.sessionID)

    return "login success";
    
  }


  @Get('test')
  async testRedis(@Req() req: Request) {
    console.log("before:"+req.session.customData)
    if(!req.session.customData)
        req.session.customData= 'hihihi'+AuthController.a;
    AuthController.a++;
    console.log("after:"+req.session.customData)
    console.log(req.sessionID)

    return this.redisService.client.get('a');
  }
}
