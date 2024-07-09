// src/common/session-auth.middleware.ts
import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class SessionAuthMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction) {
    if (!req.sessionID||!req.session.user) {
        throw new HttpException('Unauthorized',401);
    }
    next();
  }
}