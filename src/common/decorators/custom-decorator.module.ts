import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { UserRepository } from "src/user/user.repository";
import { DatabaseService } from "src/database/database.service";
import { DatabaseModule } from "src/database/database.module";
import { UserModule } from "src/user/user.module";
import { IsUserIdUnique, IsUserIdUniqueConstraint } from "./register-validation.decorator";
import { IsUserId, IsUserName } from "./basic-data-validation.decorator";


@Module({
imports:[UserModule],
providers:[IsUserIdUniqueConstraint],
exports: [IsUserIdUniqueConstraint],
})
export class CustomDecoratorModule {}