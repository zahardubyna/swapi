import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { EntityModule } from '@entities/entity.module';
import dataSourceOptions from '@database/mysql.config';
import { AuthModule } from '@auth/auth.module';
import { CaslModule } from '@casl/casl.module';
import { AuthGuard } from '@auth/guards/auth.guard';
import { UsersModule } from '@users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({
      global: true,
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => [
        {
          ttl: +(config.get<number>('THROTTLE_TTL') || 60000),
          limit: +(config.get<number>('THROTTLE_LIMIT') || 20),
        },
      ],
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
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
