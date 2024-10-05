import { Inject, Injectable } from '@nestjs/common';
import { REDIS_MANAGER } from '@database/redis.config';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  constructor(@Inject(REDIS_MANAGER) private readonly redis: Redis) {}
  async set(
    key: string,
    value: string | Buffer | number,
    database: number,
    ttl?: number,
  ): Promise<void> {
    await this.redis.select(database).then(async () => {
      ttl
        ? await this.redis.set(key, value, 'PX', ttl)
        : await this.redis.set(key, value);
    });
  }

  async get(key: string, database: number): Promise<string | null> {
    return await this.redis.select(database).then(async () => {
      return this.redis.get(key);
    });
  }

  async del(key: string, database: number): Promise<number> {
    return await this.redis.select(database).then(async () => {
      return this.redis.del(key);
    });
  }

  // Add a value to set
  // async addToSet(key: string, value: string | Buffer | number, ttl: number): Promise<void> {
  //   await this.redis.sadd(key, value);
  // }

  // Check if value in set
  // async existInSet(name: string, value: string | Buffer | number): Promise<boolean> {
  //   const result = await this.redis.sismember(name, value);
  //   return result === 1;
  // }

  // Get all members of set
  // async getAllMembersOfSet(name: string): Promise<string[]> {
  //   return this.redis.smembers(name);
  // }
}
