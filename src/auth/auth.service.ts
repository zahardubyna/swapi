import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { UsersService } from '../users/users.service';
import { UserEntity } from '../users/entity/user.entity';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { compareStrWithHash } from '../bcrypt/bcrypt';
import { ConfigService } from '@nestjs/config';
import dataSource from '../../database/datasource.config';
import { IsNull, Not } from 'typeorm';
import ms from 'ms';

@Injectable()
export class AuthService {
  private readonly access_jwt_secret: string;
  private readonly refresh_jwt_secret: string;
  private readonly access_jwt_expires: string;
  private readonly refresh_jwt_expires: string;
  private readonly salt_round: number;

  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.access_jwt_secret =
      this.configService.get<string>('ACCESS_JWT_SECRET');
    this.refresh_jwt_secret =
      this.configService.get<string>('REFRESH_JWT_SECRET');
    this.access_jwt_expires =
      this.configService.get<string>('ACCESS_JWT_EXPIRES');
    this.refresh_jwt_expires = this.configService.get<string>(
      'REFRESH_JWT_EXPIRES',
    );
    this.salt_round = +this.configService.get<string>('SECRET_SALT_ROUNDS');
  }

  async validate(username: string, password: string): Promise<UserEntity> {
    const user: UserEntity = await this.userService.getOneByUsername(username);
    if (!user) {
      throw new UnauthorizedException('User does not exist');
    }

    const valid: boolean = await compareStrWithHash(password, user.password);
    if (!valid) {
      throw new UnauthorizedException('Email or password are incorrect');
    }

    return user;
  }

  async register(registerDto: RegisterDto) {
    return this.userService.create(registerDto);
  }

  async login(loginDto: LoginDto) {
    const user: UserEntity = await this.validate(
      loginDto.username,
      loginDto.password,
    );

    const tokens = await this.getTokens(user);
    await this.updateRefreshToken(user, tokens.refresh_token);
    return tokens;
  }

  async logout(userId: number) {
    const user = await dataSource.manager.findOne(UserEntity, {
      where: { id: userId, refresh_token: Not(IsNull()) },
    });
    if (user) {
      const userWithRt = user;
      userWithRt.refresh_token = null;
      await dataSource.manager.save(UserEntity, { ...user, ...userWithRt });
    } else {
      throw new ForbiddenException('Access Denied');
    }
  }

  async refreshTokens(refreshToken: string) {
    const user = await dataSource.manager.findOne(UserEntity, {
      where: { refresh_token: refreshToken },
    });
    if (!user) {
      throw new ForbiddenException('Access Denied');
    }

    if (refreshToken !== user.refresh_token) {
      throw new ForbiddenException('Access Denied');
    }

    const tokens = await this.getTokens(user);
    await this.updateRefreshToken(user, tokens.refresh_token);
    return tokens;
  }

  async getTokens({ id, username, role }: UserEntity) {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: id,
          username: username,
          role: role,
        },
        {
          secret: this.access_jwt_secret,
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: id,
          username: username,
          role: role,
        },
        {
          secret: this.refresh_jwt_secret,
          expiresIn: '7d',
        },
      ),
    ]);
    return { access_token: at, refresh_token: rt };
  }
  async updateRefreshToken(user: UserEntity, refreshToken: string) {
    const userWithRt = user;
    userWithRt.refresh_token = refreshToken;
    await dataSource.manager.save(UserEntity, { ...user, ...userWithRt });
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
