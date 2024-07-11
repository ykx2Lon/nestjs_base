
import "express-session";
import { User } from "src/user/user.interface";
import { StrictOmit } from "ts-essentials";
// 為了讓該檔案被視為module而非script

declare module "express-session" {
    interface SessionData {
        user:StrictOmit<User, 'password'>,
        customData:string;
    }
}
