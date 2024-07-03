import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";
import { IsUserId, IsUserName, IsUserUnhashPassword } from "src/common/decorators/basic-data-validation.decorator";
import { IsUserIdUnique } from "src/common/decorators/register-validation.decorator";

export class RegisterUserDto{
    @IsUserIdUnique({ message: 'UserId already used.' })
    @IsUserId({ message: 'Invalid userId.' })
    id:string;

    @IsUserName({ message: 'Invalid userName.' })
    name:string;
    
    //TODO email加上isUnique
    @IsEmail({},{message: 'Invalid email.' })
    email:string;
    
    @IsUserUnhashPassword({ message: 'Invalid password.' })
    password:string;

}