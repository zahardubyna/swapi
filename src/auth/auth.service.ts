import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserEntity } from '../users/entity/user.entity';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validate(username: string, pass: string): Promise<UserEntity> {
    const user: UserEntity = await this.userService.getOneByUsername(username);
    if (user && pass === user.password) {
      return user;
    }
    throw new UnauthorizedException('Email or password are incorrect');
  }

  async register(registerDto: RegisterDto) {
    return this.userService.create(registerDto);
  }

  async login(loginDto: LoginDto) {
    const user: UserEntity = await this.validate(
      loginDto.username,
      loginDto.password,
    );
    const { id, username, role } = user;
    const token = await this.jwtService.signAsync({
      sub: id,
      username: username,
      role: role,
    });
    return { access_token: token };
  }
}
