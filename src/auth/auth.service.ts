import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from './register.dto';
import { User } from 'src/user/user.interface';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  private readonly saltRounds = 10;
  async registerUser(user: User) {
    user.status = 'unverified';
    user.password =await this.hashPassword(user.password);
    this.userService.createUser(user);
    //TODO email unique check
  }

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltRounds);
  }
}
