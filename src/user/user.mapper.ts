// src/user/user-mapper.ts

import { Regex } from 'src/common/regex/regex';
import { StrictOmit } from 'ts-essentials';
import { UserEntity } from '../common/database/sql/types';
import { User } from "./user.interface";


export class UserMapper {
  static toUser(row: UserEntity): User {
    return {
      id: row.user_id,
      name: row.user_name,
      email: row.email,
      password: row.password_hash,
      authStatus: row.status
    };
  }
  static toNoPasswordUser(row: UserEntity): StrictOmit<User,'password'> {
    return {
      id: row.user_id,
      name: row.user_name,
      email: row.email,
      authStatus: row.status
    };
  }
  
  static toUserEntity(user: Partial<User>): Partial<UserEntity> {
    let obj= {
      user_id: user.id,
      user_name: user.name,
      email: user.email,
      password_hash: user.password,
      status: user.authStatus
    };
    Object.keys(obj).forEach(key => {
      if (obj[key] === undefined ||obj[key] === null ||Regex.IS_BLANK.test(obj[key])) {
        delete obj[key];
      }
    });
    return obj;
  }
}
