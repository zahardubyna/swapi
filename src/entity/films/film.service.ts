import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { FilmEntity } from './filmEntity/film.entity';
import { FileImagesService } from '../../file.services/images/images.service';
import { createRelation } from '../relation/create.relation';
import { FilmCreateDto } from './filmDto/film.create.dto';
import { FilmUpdateDto } from './filmDto/film.update.dto';
import { FilmRelationDto } from './filmDto/film.relation.dto';

@Injectable()
export class FilmService {
  constructor(
    @InjectRepository(FilmEntity)
    private readonly filmRepository: Repository<FilmEntity>,
    private fileImagesService: FileImagesService,
  ) {}

  async getFilms(skip, limit) {
    return this.filmRepository.find({ skip: skip, take: limit });
  }

  async createFilm(filmCreateDto: FilmCreateDto, files: Express.Multer.File[]) {
    const newFilm = plainToInstance(FilmEntity, filmCreateDto);
    newFilm.images = await this.fileImagesService.appendFiles(files);
    return this.filmRepository.save(newFilm);
  }

  async updateFilm(
    filmUpdateDto: FilmUpdateDto,
    files: Express.Multer.File[],
    id: number,
  ) {
    const updatedFilm = await this.filmRepository.findOneBy({ id });
    const newFilm = plainToInstance(FilmEntity, filmUpdateDto);
    await this.fileImagesService.deleteFiles(updatedFilm.images);
    newFilm.images = await this.fileImagesService.appendFiles(files);
    return this.filmRepository.save({ ...updatedFilm, ...newFilm });
  }

  async deleteFilm(id: number) {
    const deletedFilm = await this.filmRepository.findOneBy({ id });
    const deletedInfo = await this.filmRepository.remove(deletedFilm);
    await this.fileImagesService.deleteFiles(deletedInfo.images);
    return deletedInfo;
  }

  async createRelationFilm(id: number, filmRelationDto: FilmRelationDto) {
    await createRelation(id, filmRelationDto, FilmEntity);
  }
}
