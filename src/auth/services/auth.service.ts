import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from '@users/users.service';
import { UserEntity } from '@users/entity/user.entity';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import * as bcrypt from 'bcrypt';
import { TokenService } from '@auth/services/token.service';
import { ConfigService } from '@nestjs/config';
import dataSource from '@database/datasource.config';
import { IsNull, Not } from 'typeorm';
import ms from 'ms';

@Injectable()
export class AuthService {
  private readonly refresh_jwt_expires: string;

  constructor(
    private readonly userService: UsersService,
    private readonly configService: ConfigService,
    private readonly tokenService: TokenService,
  ) {
    this.refresh_jwt_expires = this.configService.get<string>(
      'REFRESH_JWT_EXPIRES',
    );
  }

  async validate(username: string, password: string): Promise<UserEntity> {
    const user: UserEntity = await this.userService.getOneByUsername(username);
    if (!user) {
      throw new UnauthorizedException('User does not exist');
    }

    const valid: boolean = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new UnauthorizedException('Email or password are incorrect');
    }

    return user;
  }

  async register(registerDto: RegisterDto) {
    return this.userService.create(registerDto);
  }

  async login(loginDto: LoginDto, old_refresh_token: string | undefined) {
    const user: UserEntity = await this.validate(
      loginDto.username,
      loginDto.password,
    );

    // blacklist old refresh token with new one if it's in whitelist
    const tokens = await this.tokenService.getTokens(user);
    await this.tokenService.updateRefreshToken(
      user,
      old_refresh_token,
      tokens.refresh_token,
    );

    return tokens;
  }

  async logout(userId: number, access_token: string, refresh_token: string | undefined) {
    const user = await dataSource.manager.findOne(UserEntity, {
      where: { id: userId },
    });

    if (user) {
      await this.tokenService.updateRefreshToken(user, refresh_token);


      await this.tokenService.setTokensInBlacklist([
        access_token,
        refresh_token,
      ]);

    } else {
      throw new ForbiddenException('Access Denied');
    }
  }

  async refreshTokens(
    refresh_token: string | undefined,
  ) {
    // console.log(refresh_token);

    const payload = await this.tokenService.verifyAndDecodeRefreshToken(refresh_token);

    // console.log(payload);

    const user = await dataSource.manager.findOne(UserEntity, {
      where: {  id: payload.id },
    });

    if (!user || user.username !== payload.username) {
      throw new ForbiddenException('Access Denied');
    }

    await this.tokenService.isBlacklisted(refresh_token);

    const tokens = await this.tokenService.getTokens(user);
    await this.tokenService.updateRefreshToken(
      user,
      refresh_token,
      tokens.refresh_token,
    );
    return tokens;
  }

  async saveCookie(
    res: Response,
    tokens: { access_token: string; refresh_token: string },
  ) {
    res.cookie('refresh_token', tokens.refresh_token, {
      expires: new Date(Date.now() + ms(this.refresh_jwt_expires)),
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
  }

  async deleteCookie(res: Response) {
    res.cookie(
      'refresh_token',
      {},
      {
        expires: new Date(),
        sameSite: true,
        httpOnly: true,
      },
    );
  }
}
