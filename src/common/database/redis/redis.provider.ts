import { HttpException, Injectable } from '@nestjs/common';
import { RedisClientType, createClient } from 'redis';


@Injectable()
export class RedisProvider {
  private redis_client: RedisClientType;

  async initialize() {
    this.redis_client = createClient({
      url: process.env.REDIS_URL,
    });

    this.redis_client.on('error', (err: any) => {
      console.error('Redis Client Error', err);
      throw new HttpException('Internal Error',500)
    });

    await this.redis_client.connect();
  }
  get client(){return this.redis_client}

}