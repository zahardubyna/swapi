import 'dotenv/config';

export const REDIS_MANAGER = 'REDIS_MANAGER';

export const redisConfig = {
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_DOCKER_CONTAINER_PORT),
}

export default redisConfig;