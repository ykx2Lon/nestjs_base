import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from '../database/redis/redis.module';
import { SessionMiddleware } from './session.middleware';

@Module({
  imports: [ConfigModule.forRoot(),RedisModule],
  providers: [SessionMiddleware],
  exports: [SessionMiddleware],
})
export class SessionMoudle {}
