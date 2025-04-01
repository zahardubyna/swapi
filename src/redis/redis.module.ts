import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { REDIS_MANAGER, redisConfig } from '@database/redis.config';
import Redis from 'ioredis';

@Module({
  providers: [
    RedisService,
    {
      provide: REDIS_MANAGER,
      useFactory: () => {
        return new Redis({
          ...redisConfig,
        });
      },
    },
  ],
  exports: [RedisService, REDIS_MANAGER],
})
export class RedisModule {}
