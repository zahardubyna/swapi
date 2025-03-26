import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { StarshipEntity } from '@entities/starships/entity/starship.entity';
import { FileImagesService } from '@file.services/images/images.service';
import { StarshipCreateDto } from '@entities/starships/dto/starship.create.dto';
import { StarshipUpdateDto } from '@entities/starships/dto/starship.update.dto';
import { StarshipRelationDto } from '@entities/starships/dto/starship.relation.dto';
import { createRelation } from '../../relation/create.relation';

@Injectable()
export class StarshipService {
  constructor(
    @InjectRepository(StarshipEntity)
    private readonly starshipRepository: Repository<StarshipEntity>,
    private fileImagesService: FileImagesService,
  ) {}

  async getFew(skip: number, limit: number) {
    return this.starshipRepository.find({ skip: skip, take: limit });
  }

  async getOne(id: number) {
    return this.starshipRepository.findOne({ where: { id } });
  }

  async create(
    starshipCreateDto: StarshipCreateDto,
    files: Express.Multer.File[],
  ) {
    const starship = plainToInstance(StarshipEntity, starshipCreateDto);
    starship.images = await this.fileImagesService.appendFiles(files);
    return this.starshipRepository.save(starship);
  }

  async update(
    starshipUpdateDto: StarshipUpdateDto,
    files: Express.Multer.File[],
    id: number,
  ) {
    const starship = await this.starshipRepository.findOneBy({ id });
    const newStarship = plainToInstance(StarshipEntity, starshipUpdateDto);
    await this.fileImagesService.deleteFiles(starship.images);
    newStarship.images = await this.fileImagesService.appendFiles(files);
    return this.starshipRepository.save({ ...starship, ...newStarship });
  }

  async delete(id: number) {
    const starship = await this.starshipRepository.findOneBy({ id });
    const info = await this.starshipRepository.remove(starship);
    await this.fileImagesService.deleteFiles(info.images);
    return info;
  }

  async createRelationWith(
    id: number,
    starshipRelationDto: StarshipRelationDto,
  ) {
    await createRelation(id, starshipRelationDto, StarshipEntity);
  }
}
