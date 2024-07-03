// src/user/user-mapper.ts

import { User } from "./user.interface";
import { UserEntity } from '../database/types'


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
  static toUserEntity(user: User): UserEntity {
    return {
      user_id: user.id,
      user_name: user.name,
      email: user.email,
      password_hash: user.password,
      status: user.status
    };
  }
}
