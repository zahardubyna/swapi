import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeopleEntity } from './peoplerEntity/people.entity';
import { PeopleController } from './people.controller';
import { PeopleService } from './people.service';

@Module({
  imports: [TypeOrmModule.forFeature([PeopleEntity])],
  controllers: [PeopleController],
  providers: [PeopleService],
})
export class PeopleModule {}
