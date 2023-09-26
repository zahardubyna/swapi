import { DataSourceOptions } from 'typeorm';
import 'dotenv/config';

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.HOST,
  port: +process.env.PORT,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/database/migration/*.js'],
};

export default dataSourceOptions;
