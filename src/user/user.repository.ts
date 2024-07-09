import { Injectable } from '@nestjs/common';

import { DatabaseProvider } from 'src/common/database/sql/database.provider';
import { UserEntity } from 'src/common/database/sql/types';
import { User } from './user.interface';
import { UserMapper } from './user.mapper';

@Injectable()
export class UserRepository {
  constructor(private readonly databaseService: DatabaseProvider) {}

  // 通用的 update user by id
  async updateByUserId(
    id: string,
    userFields: Partial<Omit<User, 'user_id'>>,
  ): Promise<void> {
    let tableField = UserMapper.toUserEntity(userFields);
    await this.databaseService.db
      .updateTable('user')
      .set(tableField)
      .where('user_id', '=', id)
      .execute();
  }

  // 通用的 find user by...
  async findUserBy(conditions: Partial<User>): Promise<User | null> {
    let tableCondition = UserMapper.toUserEntity(conditions);
    let query = this.databaseService.db.selectFrom('user').selectAll();
    for (const [column, value] of Object.entries(tableCondition)) {
      query = query.where(column as keyof UserEntity, '=', value);
    }
    const row = await query.executeTakeFirst();
    return row ? UserMapper.toUser(row) : null;
  }

  async createUser(user: User): Promise<any | null> {
    const { insertId } = await this.databaseService.db
      .insertInto('user')
      .values(UserMapper.toUserEntity(user))
      .executeTakeFirstOrThrow();
    return await this.findUserBy({id:String(insertId!)});
  }
}
