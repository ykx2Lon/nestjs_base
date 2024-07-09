// src/user/user-mapper.ts

import { UserEntity } from '../common/database/sql/types';
import { User } from "./user.interface";


export class UserMapper {
  static toUser(row: UserEntity): User {
    return {
      id: row.user_id,
      name: row.user_name,
      email: row.email,
      password: row.password_hash,
      status: row.status
    };
  }
  
  static toUserEntity(user: Partial<User>): Partial<UserEntity> {
    let obj= {
      user_id: user.id,
      user_name: user.name,
      email: user.email,
      password_hash: user.password,
      status: user.status
    };
    Object.keys(obj).forEach(key => {
      if (obj[key] === undefined ||obj[key] === null) {
        delete obj[key];
      }
    });
    return obj;
  }
}
