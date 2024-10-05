import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesModule } from '@file.services/images/images.module';
import { CaslModule } from '@casl/casl.module';
import { PeopleEntity } from './peopleEntity/people.entity';
import { PeopleController } from './people.controller';
import { PeopleService } from './people.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([PeopleEntity]), ImagesModule, CaslModule],
  controllers: [PeopleController],
  providers: [PeopleService, ConfigService, JwtService],
})
export class PeopleModule {}
