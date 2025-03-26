import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { ConfigService } from '@nestjs/config';
import { CaslModule } from '@casl/casl.module';
import { permissions } from './users.permissions';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), CaslModule.forFeature({ permissions })],
  controllers: [UsersController],
  providers: [UsersService, ConfigService],
  exports: [UsersService],
})
export class UsersModule {}
