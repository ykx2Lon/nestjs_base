import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Put,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { IsEmail, IsOptional } from 'class-validator';
import { Request } from 'express';
import {
  IsUserId,
  IsUserName,
} from 'src/common/decorators/basic-data-validation.decorator';
import { UserService } from './user.service';


class UserUpdateDto {
  @IsOptional()
  @IsUserName({ message: 'Invalid userName.' })
  name: string;
}

@Controller('user')
export class UserController {
  constructor(private readonly userService:UserService){}
  @Get(':id')
  getUser(
    @Param('id') id: string,
    @Req() req: Request,
  ) {
    if (id != req.session.user.id)
      throw new HttpException('Access Denied', 403);
    return req.session.user;
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true })) //過濾雜訊
  updateUserData(
    @Param('id') id: string,
    @Req() req: Request,
    @Body() body: UserUpdateDto,
  ) {
    if (id != req.session.user.id)
      throw new HttpException('Access Denied', 403);
    this.userService.updateUserDataExceptAuthById(id,body)
    return req.session.user;
  }
}
