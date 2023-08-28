import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeopleEntity } from './people.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PeopleEntity])],
})
export class PeopleModule {}
