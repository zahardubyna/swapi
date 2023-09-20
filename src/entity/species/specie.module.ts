import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpecieEntity } from './specieEntity/specie.entity';
import { SpecieController } from './specie.controller';
import { SpecieService } from './specie.service';
import { FileImagesService } from '../../file.services/images/images.service';
import { FileService } from '../../file.services/file/file.service';

@Module({
  imports: [TypeOrmModule.forFeature([SpecieEntity])],
  controllers: [SpecieController],
  providers: [SpecieService, FileImagesService, FileService],
})
export class SpecieModule {}
