import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserEntity } from './entity/user.entity';
import dataSource from '../../database/datasource.config';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from '@auth/dto/register.dto';

@Injectable()
export class UsersService {
  private readonly salt_round: number;
  constructor(private configService: ConfigService) {
    this.salt_round = +this.configService.get<string>('SECRET_SALT_ROUNDS');
  }

  async getAll(): Promise<UserEntity[]> {
    return dataSource.manager.find(UserEntity);
  }
  async getFew(skip: number, limit: number): Promise<UserEntity[]> {
    return dataSource.manager.find(UserEntity, { skip: skip, take: limit });
  }

  async getOneByUsername(username: string): Promise<UserEntity> {
    return dataSource.manager.findOne(UserEntity, { where: { username } });
  }

  async getOneById(id: number): Promise<UserEntity> {
    return dataSource.manager.findOne(UserEntity, { where: { id } });
  }
  async create(newUser: RegisterDto): Promise<UserEntity> {
    const user: UserEntity = await dataSource.manager.findOne(UserEntity, {
      where: { username: newUser.username },
    });

    if (user) throw new BadRequestException('User already exist');

    const hash_password = await bcrypt.hash(
      newUser.password,
      await bcrypt.genSalt(this.salt_round),
    );

    return dataSource.manager
      .save(UserEntity, {
        username: newUser.username,
        password: hash_password,
      })
      .then((user: UserEntity) => {
        user.password = newUser.password;
        return user;
      });
  }
}
