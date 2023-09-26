import { Module } from '@nestjs/common';
import { StarshipController } from './starship.controller';
import { StarshipService } from './starship.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StarshipEntity } from './starshipEntity/starship.entity';
import { FileImagesService } from '../../file.services/images/images.service';
import { FileService } from '../../file.services/file/file.service';
import { BucketService } from '../../file.services/bucket/bucket.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([StarshipEntity])],
  controllers: [StarshipController],
  providers: [
    StarshipService,
    FileImagesService,
    FileService,
    BucketService,
    ConfigService,
  ],
})
export class StarshipModule {}
