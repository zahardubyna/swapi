import { DataSourceOptions } from 'typeorm';
import 'dotenv/config';
import process from 'process';

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: String(process.env.MYSQL_HOST),
  port: Number(process.env.MYSQL_DOCKER_CONTAINER_PORT),
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  synchronize: false,
  // logging: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/database/migrations/*{.ts,.js}'],
};

export default dataSourceOptions;
