import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserModule } from "src/user/user.module";
import { MailModule } from "src/common/mail/mail.module";


@Module({
imports:[UserModule,MailModule],
providers:[AuthService],
controllers: [AuthController],
exports: [AuthService],
})
export class AuthModule {}