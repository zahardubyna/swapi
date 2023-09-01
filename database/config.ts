import { DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 6033,
  username: 'root',
  password: 'root',
  database: 'starwars',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/database/migration/*.js'],
};

export default dataSourceOptions;
