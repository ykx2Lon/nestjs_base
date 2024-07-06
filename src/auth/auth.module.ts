import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserModule } from "src/user/user.module";
import { MailModule } from "src/common/mail/mail.module";
import { RedisModule } from "src/common/database/redis/redis.module";


@Module({
imports:[UserModule,MailModule,RedisModule],
providers:[AuthService],
controllers: [AuthController],
exports: [AuthService],
})
export class AuthModule {}