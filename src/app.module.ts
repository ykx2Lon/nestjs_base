import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { RedisModule } from './common/database/redis/redis.module';
import { CustomDecoratorModule } from './common/decorators/custom-decorator.module';
import { SessionMiddleware } from './common/session/session.middleware';
import { SessionMoudle } from './common/session/session.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthModule,CustomDecoratorModule, SessionMoudle, RedisModule,UserModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SessionMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
