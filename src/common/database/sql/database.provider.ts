import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Kysely, MysqlDialect } from 'kysely';
import { createPool } from 'mysql2';
import { DB } from './types';

@Injectable()
export class DatabaseProvider {
  private readonly database: Kysely<DB>;
  constructor(private readonly configService: ConfigService) {
    const dialect = new MysqlDialect({
      pool: createPool(process.env.DATABASE_URL),
    });
    this.database = new Kysely<DB>({
        dialect,
      })
  }
  get db(){return this.database;}
}
