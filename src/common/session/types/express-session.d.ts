
import { SessionData } from "express-session";
// 為了讓該檔案被視為module而非script

declare module "express-session" {
    interface SessionData {
        customData:string;
        isAuthed:boolean=false;
    }
}
