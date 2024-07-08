import { Injectable, NestMiddleware } from '@nestjs/common';
import RedisStore from 'connect-redis';
import * as session from 'express-session';
import { RedisProvider } from '../database/redis/redis.provider';

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  constructor(private readonly redisProvider: RedisProvider) {}
  use(req: any, res: any, next: () => void) {
    session({
      store: new RedisStore({ client: this.redisProvider.client,ttl:Number(process.env.TTL)}),
      secret: process.env.SESSION_SECRECT,
      resave: true,
      saveUninitialized: true,
      cookie: { secure: false,maxAge:Number(process.env.TTL)*1000},
    })(req, res, next);
  }
}
