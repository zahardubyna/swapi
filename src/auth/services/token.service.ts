import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserEntity } from '@users/entity/user.entity';
import { RedisService } from '../../redis/redis.service';
import { ConfigService } from '@nestjs/config';
import ms from 'ms';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '@auth/strategy/rt.strategy';

@Injectable()
export class TokenService {
  private readonly access_jwt_secret: string;
  private readonly refresh_jwt_secret: string;
  private readonly access_jwt_expires: string;
  private readonly refresh_jwt_expires: string;
  private readonly whitelist_id: number;
  private readonly blacklist_id: number;

  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
  ) {
    this.access_jwt_secret =
      this.configService.get<string>('ACCESS_JWT_SECRET');
    this.refresh_jwt_secret =
      this.configService.get<string>('REFRESH_JWT_SECRET');
    this.access_jwt_expires =
      this.configService.get<string>('ACCESS_JWT_EXPIRES');
    this.refresh_jwt_expires =
      this.configService.get<string>('REFRESH_JWT_EXPIRES');
    this.whitelist_id = this.configService.get<number>('REDIS_WHITELIST_ID');
    this.blacklist_id = this.configService.get<number>('REDIS_BLACKLIST_ID');
  }

  async getTokens({ id, username, role }: UserEntity) {
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(
        {
          id: id,
          username: username,
          role: role,
        },
        {
          secret: this.access_jwt_secret,
          expiresIn: this.access_jwt_expires,
        },
      ),
      this.jwtService.signAsync(
        {
          id: id,
          username: username,
          role: role,
        },
        {
          secret: this.refresh_jwt_secret,
          expiresIn: this.refresh_jwt_expires,
        },
      ),
    ]);
    return { access_token: access_token, refresh_token: refresh_token };
  }

  async verifyAndDecodeRefreshToken(token: string | undefined): Promise<JwtPayload> {
    try {
      return await this.jwtService.verifyAsync(token, {
        secret: this.refresh_jwt_secret,
      });
    } catch {
      throw new UnauthorizedException();
    }
  }

  async updateRefreshToken(
    user: UserEntity,
    old_refresh_token: string | undefined,
    refresh_token?: string | undefined,
  ) {
    const result = await this.redisService.get(
      `${user.username}:${old_refresh_token}`,
      this.whitelist_id,
    );

    if (!!result) {
      await this.redisService.del(
        `${user.username}:${old_refresh_token}`,
        this.whitelist_id,
      );

      await this.redisService.set(
        old_refresh_token,
        'blacklisted',
        this.blacklist_id,
        ms(this.refresh_jwt_expires),
      );
    }

    if(refresh_token){
      await this.redisService.set(
        `${user.username}:${refresh_token}`,
        'whitelisted',
        this.whitelist_id,
        ms(this.refresh_jwt_expires),
      );
    }
  }

  // async setTokensInBlacklist(
  //   username: string,
  //   [access_token, refresh_token]: string[],
  // ) {
  //   await this.redisService.addToSet(username, access_token, ms(this.access_jwt_expires));
  //   await this.redisService.addToSet(username, refresh_token, ms(this.refresh_jwt_expires));
  // }

  async setTokensInBlacklist([access_token, refresh_token]: string[]) {
    await this.redisService.set(
      access_token,
      'blacklisted',
      this.blacklist_id,
      ms(this.access_jwt_expires),
    );

    if (refresh_token) {
      await this.redisService.set(
        refresh_token,
        'blacklisted',
        this.blacklist_id,
        ms(this.refresh_jwt_expires),
      );
    }
  }

  // async existTokenInBlacklist(username: string, token: string) {
  //   if (
  //     await this.redisService.existInSet(username, token)
  //   ) {
  //     throw new UnauthorizedException()
  //   }
  // }

  // returns UnauthorizedException() if token blacklisted
  async isBlacklisted(token: string): Promise<void> {
    const result = await this.redisService.get(token, this.blacklist_id);
    if (!!result) {
      throw new UnauthorizedException();
    }
  }

  // async getTokenFromBlacklist(username: string) {
  //   await this.redisService.getAllMembersOfSet(username);
  // }
}
