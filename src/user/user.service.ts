import { Injectable } from "@nestjs/common";
import { User } from "./user.interface";
import { UserRepository } from "./user.repository";

@Injectable()
export class UserService{
    constructor(private readonly userRespository: UserRepository){}

    async findById(id:string):Promise<User|null>{
        return this.userRespository.findUserById(id);
    }

    async findByEmail(email:string):Promise<User|null>{
        return this.userRespository.findUserByEmail(email);
    }

    async createUser(user: User): Promise<any | null> {
        return this.userRespository.createUser(user);
    }

    async updateStautsByUserId(id:string,newStatus:string){
        this.userRespository.updateStautsByUserId(id, newStatus);
    }

}