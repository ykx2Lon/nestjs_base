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

class UserIdDto {
  @IsUserId({ message: 'Invalid userId.' })
  id: string;
}

class UserUpdateDto {
  @IsOptional()
  @IsUserName({ message: 'Invalid userName.' })
  name: string;
  //TODO email加上isUnique
  @IsOptional()
  @IsEmail({}, { message: 'Invalid email.' })
  email: string;
}

@Controller('user')
export class UserController {
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
  updateUser(
    @Param('id') id: string,
    @Req() req: Request,
    @Body() body: UserUpdateDto,
  ) {
    if (id != req.session.user.id)
      throw new HttpException('Access Denied', 403);
    //TODO updateUserNameAndEmail
    return req.session.user;
  }
}
