import 'dotenv/config';

export const REDIS_MANAGER = 'REDIS_MANAGER';

export const redisConfig = {
  host: process.env.REDIS_HOST,
  port: +process.env.REDIS_PORT,
}

export default redisConfig;