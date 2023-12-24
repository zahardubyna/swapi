import 'dotenv/config';

const seedConfig = {
  type: 'mysql',
  host: process.env.HOST,
  port: +process.env.PORT,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  entities: ['src/**/*.entity.ts'],
  migrations: ['dist/database/migration/*.js'],
  seeds: ['database/seeds/seeds.ts'],
  factories: [`database/factories/*.factory.ts`],
  extra: {
    charset: 'utf8mb4_general_ci',
  },
  synchronize: false,
  // logging: true,
};
// console.log(seedConfig);

export default seedConfig;
