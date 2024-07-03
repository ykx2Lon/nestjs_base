import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserRepository } from "src/user/user.repository";
import { DatabaseService } from "src/database/database.service";
import { DatabaseModule } from "src/database/database.module";
import { UserModule } from "src/user/user.module";
import { CustomDecoratorModule } from "src/common/decorators/custom-decorator.module";


@Module({
imports:[UserModule],
providers:[AuthService],
controllers: [AuthController],
exports: [AuthService],
})
export class AuthModule {}