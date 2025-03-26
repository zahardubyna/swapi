import { DataSource, DataSourceOptions } from 'typeorm';
import 'dotenv/config';
import process from 'process';

const seedDataSource: DataSource = new DataSource({
  type: 'mysql',
  host: String(process.env.MYSQL_HOST),
  port: Number(process.env.MYSQL_DOCKER_CONTAINER_PORT),
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  synchronize: false,
  entities: ['src/**/*.entity{.ts,.js}'],
  migrations: ['database/migrations/*{.ts,.js}'],
} as DataSourceOptions);

export default seedDataSource;
