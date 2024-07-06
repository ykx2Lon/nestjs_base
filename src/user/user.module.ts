import { Module } from "@nestjs/common";
import { UserRepository } from "src/user/user.repository";
import { DatabaseModule } from "src/common/database/sql/database.module";
import { UserService } from "./user.service";


@Module({
imports:[DatabaseModule],
providers:[UserRepository,UserService],
controllers: [],
exports: [UserService],
})
export class UserModule {}