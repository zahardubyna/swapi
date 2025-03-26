import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { AccessTokenStrategy } from './strategy/at.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersService } from '@users/users.service';
import { UsersModule } from '@users/users.module';
import { PassportModule } from '@nestjs/passport';
import { RefreshTokenStrategy } from './strategy/rt.strategy';
import { TokenService } from './services/token.service';
import { RedisModule } from '../redis/redis.module';
import { RedisService } from '../redis/redis.service';

@Module({
  imports: [PassportModule, UsersModule, RedisModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    ConfigService,
    UsersService,
    TokenService,
    RedisService,
  ],
  exports: [
    TokenService
  ]
})
export class AuthModule {}
