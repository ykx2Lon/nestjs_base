import { Injectable } from "@nestjs/common";
import { StrictOmit } from "ts-essentials";
import { User } from "./user.interface";
import { UserRepository } from "./user.repository";

@Injectable()
export class UserService{
    constructor(private readonly userRespository: UserRepository){}

    async findByIdWithPassword(id:string):Promise<User>|null{
        return this.userRespository.findUserById(id);
    }

    async findById (id:string):Promise<StrictOmit<User,'password'>|null>{
        return this.userRespository.findUserExcludePasswordBy({id:id});
    }

    async findByEmail(email:string):Promise<StrictOmit<User,'password'>|null>{
        return this.userRespository.findUserExcludePasswordBy({email:email});
    }

    async createUser(user: User): Promise<any | null> {
        return this.userRespository.createUser(user);
    }

    async updateStautsByUserId(id:string,newStatus:string){
        this.userRespository.updateByUserId(id, {authStatus:newStatus});
    }
    
    async updateUserDataExceptAuthById(id:string,
        userData:Partial<StrictOmit<User,'id'|'password'|'email'|'authStatus'>>){
        await this.userRespository.updateByUserId(id,userData);
        
    }

}