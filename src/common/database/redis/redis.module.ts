import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import {  RedisProvider } from "./redis.provider";


@Module({
imports:[ConfigModule.forRoot()],
providers:[{
    provide:RedisProvider,
    useFactory:async()=>{
        const service = new RedisProvider();
        await service.initialize();
        return service;
    }
}]

,exports: [RedisProvider],
})
export class RedisModule {}