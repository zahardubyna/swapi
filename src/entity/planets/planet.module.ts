import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanetEntity } from './planetEntity/planet.entity';
import { PlanetService } from './planet.service';
import { PlanetController } from './planet.controller';
import { FileImagesService } from '../../file.services/images/images.service';
import { FileService } from '../../file.services/file/file.service';

@Module({
  imports: [TypeOrmModule.forFeature([PlanetEntity])],
  controllers: [PlanetController],
  providers: [PlanetService, FileImagesService, FileService],
})
export class PlanetModule {}
