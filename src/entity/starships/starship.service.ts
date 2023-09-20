import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { StarshipEntity } from './starshipEntity/starship.entity';
import { FileImagesService } from '../../file.services/images/images.service';
import { StarshipCreateDto } from './starshipDto/starship.create.dto';
import { StarshipUpdateDto } from './starshipDto/starship.update.dto';
import { StarshipRelationDto } from './starshipDto/starship.relation.dto';
import { createRelation } from '../relation/create.relation';

@Injectable()
export class StarshipService {
  constructor(
    @InjectRepository(StarshipEntity)
    private readonly starshipRepository: Repository<StarshipEntity>,
    private fileImagesService: FileImagesService,
  ) {}

  async getStarships(skip, limit) {
    return this.starshipRepository.find({ skip: skip, take: limit });
  }

  async createStarship(
    starshipCreateDto: StarshipCreateDto,
    files: Express.Multer.File[],
  ) {
    const newStarship = plainToInstance(StarshipEntity, starshipCreateDto);
    newStarship.images = await this.fileImagesService.appendFiles(files);
    return this.starshipRepository.save(newStarship);
  }

  async updateStarship(
    starshipUpdateDto: StarshipUpdateDto,
    files: Express.Multer.File[],
    id: number,
  ) {
    const updatedStarship = await this.starshipRepository.findOneBy({ id });
    const newStarship = plainToInstance(StarshipEntity, starshipUpdateDto);
    await this.fileImagesService.deleteFiles(updatedStarship.images);
    newStarship.images = await this.fileImagesService.appendFiles(files);
    return this.starshipRepository.save({ ...updatedStarship, ...newStarship });
  }

  async deleteStarship(id: number) {
    const deletedStarship = await this.starshipRepository.findOneBy({ id });
    const deletedInfo = await this.starshipRepository.remove(deletedStarship);
    await this.fileImagesService.deleteFiles(deletedInfo.images);
    return deletedInfo;
  }

  async createRelationStarship(
    id: number,
    starshipRelationDto: StarshipRelationDto,
  ) {
    await createRelation(id, starshipRelationDto, StarshipEntity);
  }
}
