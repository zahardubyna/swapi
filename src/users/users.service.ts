import { BadRequestException, Injectable } from '@nestjs/common';
import { UserEntity } from './entity/user.entity';
import dataSource from '../../database/datasource.config';

@Injectable()
export class UsersService {
  constructor() {}

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
  async create(newUser): Promise<UserEntity> {
    const user: UserEntity = await dataSource.manager.findOne(UserEntity, {
      where: { username: newUser.username },
    });
    if (user) throw new BadRequestException('User already exist');
    return dataSource.manager.save(UserEntity, {
      username: newUser.username,
      password: newUser.password,
    });
  }
}
