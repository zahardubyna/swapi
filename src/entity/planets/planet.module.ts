import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanetEntity } from './planetEntity/planet.entity';
import { PlanetService } from './planet.service';
import { PlanetController } from './planet.controller';
import { FileImagesService } from '../../file.services/images/images.service';
import { FileService } from '../../file.services/file/file.service';
import { BucketService } from '../../file.services/bucket/bucket.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([PlanetEntity])],
  controllers: [PlanetController],
  providers: [
    PlanetService,
    FileImagesService,
    FileService,
    BucketService,
    ConfigService,
    JwtService,
  ],
})
export class PlanetModule {}
