import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeopleEntity } from './peopleEntity/people.entity';
import { PeopleController } from './people.controller';
import { PeopleService } from './people.service';
import { FileImagesService } from '../../file.services/images/images.service';
import { FileService } from '../../file.services/file/file.service';
import { BucketService } from '../../file.services/bucket/bucket.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([PeopleEntity])],
  controllers: [PeopleController],
  providers: [
    PeopleService,
    FileImagesService,
    FileService,
    BucketService,
    ConfigService,
  ],
})
export class PeopleModule {}
