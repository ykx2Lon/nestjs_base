import { Injectable } from '@nestjs/common';

import { User } from './user.interface';
import { UserMapper } from './user.mapper';
import { DatabaseProvider } from 'src/common/database/sql/database.provider';

@Injectable()
export class UserRepository {
  async updateStautsByUserId(id: string,newStatus:string) {
    const row = await this.databaseService.db
    .updateTable('user').set({status:newStatus})
    .where('user_id', '=', id)
    .executeTakeFirst();
    if(!row) throw new Error("update failed:No match condition.");
  }
  constructor(private readonly databaseService: DatabaseProvider) {}
  async findUserById(id: string): Promise<User | null> {
    const row = await this.databaseService.db
      .selectFrom('user')
      .where('user_id', '=', id)
      .selectAll()
      .executeTakeFirst();
    return row ? UserMapper.toUser(row) : null;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const row = await this.databaseService.db
      .selectFrom('user')
      .where('email', '=', email)
      .selectAll()
      .executeTakeFirst();
    return row ? UserMapper.toUser(row) : null;
  }

  async createUser(user: User): Promise<any | null> {
    const { insertId } = await this.databaseService.db
      .insertInto('user')
      .values(UserMapper.toUserEntity(user))
      .executeTakeFirstOrThrow();
    return await this.findUserById(String(insertId!));
  }
}
