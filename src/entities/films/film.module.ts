import { Module } from '@nestjs/common';
import { FilmController } from './film.controller';
import { FilmService } from './film.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesModule } from '@file.services/images/images.module';
import { CaslModule } from '@casl/casl.module';
import { FilmEntity } from './filmEntity/film.entity';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([FilmEntity]), ImagesModule, CaslModule],
  controllers: [FilmController],
  providers: [FilmService, ConfigService, JwtService],
})
export class FilmModule {}
