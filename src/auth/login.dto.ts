import { IsUserId, IsUserUnhashPassword } from "src/common/decorators/basic-data-validation.decorator";

export class LoginDataDto{
    @IsUserId({ message: 'Invalid userId.' })
    id:string;

    @IsUserUnhashPassword({ message: 'Invalid password.' })
    password:string;
    
}