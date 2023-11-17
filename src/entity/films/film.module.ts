import { Module } from '@nestjs/common';
import { FilmController } from './film.controller';
import { FilmService } from './film.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmEntity } from './filmEntity/film.entity';
import { FileImagesService } from '../../file.services/images/images.service';
import { FileService } from '../../file.services/file/file.service';
import { BucketService } from '../../file.services/bucket/bucket.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([FilmEntity])],
  controllers: [FilmController],
  providers: [
    FilmService,
    FileImagesService,
    FileService,
    BucketService,
    ConfigService,
    JwtService,
  ],
})
export class FilmModule {}
