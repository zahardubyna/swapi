import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityModule } from '@entities/entity.module';
import dataSourceOptions from '@database/mysql.config';
import { AuthModule } from '@auth/auth.module';
import { CaslModule } from '@casl/casl.module';
import { AuthGuard } from '@auth/guards/auth.guard';
import { UsersModule } from '@users/users.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({
      global: true,
    }),
    AuthModule,
    CaslModule,
    UsersModule,
    EntityModule,
    RedisModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
  ],
})
export class AppModule {}
