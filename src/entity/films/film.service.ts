import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { FilmEntity } from './filmEntity/film.entity';
import { FileImagesService } from '../../file.services/images/images.service';
import { FilmCreateDto } from './filmDto/film.create.dto';
import { FilmUpdateDto } from './filmDto/film.update.dto';
import { FilmRelationDto } from './filmDto/film.relation.dto';
import { createRelation } from '../../relation/create.relation';

@Injectable()
export class FilmService {
  constructor(
    @InjectRepository(FilmEntity)
    private readonly filmRepository: Repository<FilmEntity>,
    private fileImagesService: FileImagesService,
  ) {}

  async getFew(skip: number, limit: number) {
    return this.filmRepository.find({ skip: skip, take: limit });
  }

  async getOne(limit: number) {
    return this.filmRepository.find({ skip: limit - 1, take: 1 });
  }

  async create(filmCreateDto: FilmCreateDto, files: Express.Multer.File[]) {
    const film = plainToInstance(FilmEntity, filmCreateDto);
    film.images = await this.fileImagesService.appendFiles(files);
    return this.filmRepository.save(film);
  }

  async update(
    filmUpdateDto: FilmUpdateDto,
    files: Express.Multer.File[],
    id: number,
  ) {
    const film = await this.filmRepository.findOneBy({ id });
    const newFilm = plainToInstance(FilmEntity, filmUpdateDto);
    await this.fileImagesService.deleteFiles(film.images);
    newFilm.images = await this.fileImagesService.appendFiles(files);
    return this.filmRepository.save({ ...film, ...newFilm });
  }

  async delete(id: number) {
    const film = await this.filmRepository.findOneBy({ id });
    const info: FilmEntity = await this.filmRepository.remove(film);
    await this.fileImagesService.deleteFiles(info.images);
    return film;
  }

  async createRelationWith(id: number, filmRelationDto: FilmRelationDto) {
    await createRelation(id, filmRelationDto, FilmEntity);
  }
}
