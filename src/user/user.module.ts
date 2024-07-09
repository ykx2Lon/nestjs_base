import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { DatabaseModule } from "src/common/database/sql/database.module";
import { SessionAuthMiddleware } from "src/common/session/session-auth.middleware";
import { UserRepository } from "src/user/user.repository";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";


@Module({
imports:[DatabaseModule],
providers:[UserRepository,UserService],
controllers: [UserController],
exports: [UserService],
})
export class UserModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
          .apply(SessionAuthMiddleware)
          .forRoutes(UserController);
      }
}