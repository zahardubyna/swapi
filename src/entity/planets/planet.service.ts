import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { PlanetEntity } from './planetEntity/planet.entity';
import { FileImagesService } from '../../file.services/images/images.service';
import { PlanetCreateDto } from './planetDto/planet.create.dto';
import { PlanetUpdateDto } from './planetDto/planet.update.dto';
import { PlanetRelationDto } from './planetDto/planet.relation.dto';
import { createRelation } from '../../relation/create.relation';

@Injectable()
export class PlanetService {
  constructor(
    @InjectRepository(PlanetEntity)
    private readonly planetRepository: Repository<PlanetEntity>,
    private fileImagesService: FileImagesService,
  ) {}

  async getPlanets(skip, limit) {
    return this.planetRepository.find({ skip: skip, take: limit });
  }

  async createPlanet(
    planetCreateDto: PlanetCreateDto,
    files: Express.Multer.File[],
  ) {
    const newPlanet = plainToInstance(PlanetEntity, planetCreateDto);
    newPlanet.images = await this.fileImagesService.appendFiles(files);
    return this.planetRepository.save(newPlanet);
  }

  async updatePlanet(
    planetUpdateDto: PlanetUpdateDto,
    files: Express.Multer.File[],
    id: number,
  ) {
    const updatedPlanet = await this.planetRepository.findOneBy({ id });
    const newPlanet = plainToInstance(PlanetEntity, planetUpdateDto);
    await this.fileImagesService.deleteFiles(updatedPlanet.images);
    newPlanet.images = await this.fileImagesService.appendFiles(files);
    return this.planetRepository.save({ ...updatedPlanet, ...newPlanet });
  }

  async deletePlanet(id: number) {
    const deletedPlanet = await this.planetRepository.findOneBy({ id });
    const deletedInfo = await this.planetRepository.remove(deletedPlanet);
    await this.fileImagesService.deleteFiles(deletedInfo.images);
    return deletedInfo;
  }

  async createRelationPlanet(id: number, planetRelationDto: PlanetRelationDto) {
    await createRelation(id, planetRelationDto, PlanetEntity);
  }
}
