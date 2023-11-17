import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityModule } from './entity/entity.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import dataSourceOptions from '../database/config';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
// import { UserEntity } from './users/entity/user.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    AuthModule,
    UsersModule,
    EntityModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../', 'public/main'),
    }),
    ConfigModule,
  ],
})
export class AppModule {}
