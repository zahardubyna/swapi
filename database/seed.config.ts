import 'dotenv/config';

const seedConfig = {
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  entities: ['src/**/*.entity.ts'],
  migrations: ['dist/database/migration/*.js'],
  seeds: ['database/seeds/seeds.ts'],
  factories: [`database/factories/*.factory.ts`],
  extra: {
    charset: 'utf8mb4_general_ci',
  },
  synchronize: false,
};

export default seedConfig;
