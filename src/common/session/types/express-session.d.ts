
import { SessionData } from "express-session";
import { User } from "src/user/user.interface";
// 為了讓該檔案被視為module而非script

declare module "express-session" {
    interface SessionData {
        user:Omit<User, 'password'>,
        customData:string;
    }
}
