import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { PlanetEntity } from '@entities/planets/entity/planet.entity';
import { FileImagesService } from '@file.services/images/images.service';
import { PlanetCreateDto } from '@entities/planets/dto/planet.create.dto';
import { PlanetUpdateDto } from '@entities/planets/dto/planet.update.dto';
import { PlanetRelationDto } from '@entities/planets/dto/planet.relation.dto';
import { createRelation } from '../../relation/create.relation';

@Injectable()
export class PlanetService {
  constructor(
    @InjectRepository(PlanetEntity)
    private readonly planetRepository: Repository<PlanetEntity>,
    private fileImagesService: FileImagesService,
  ) {}

  async getFew(skip: number, limit: number) {
    return this.planetRepository.find({ skip: skip, take: limit });
  }

  async getOne(id: number) {
    return this.planetRepository.findOne({ where: { id } });
  }

  async create(planetCreateDto: PlanetCreateDto, files: Express.Multer.File[]) {
    const planet = plainToInstance(PlanetEntity, planetCreateDto);
    planet.images = await this.fileImagesService.appendFiles(files);
    return this.planetRepository.save(planet);
  }

  async update(
    planetUpdateDto: PlanetUpdateDto,
    files: Express.Multer.File[],
    id: number,
  ) {
    const planet = await this.planetRepository.findOneBy({ id });
    const newPlanet = plainToInstance(PlanetEntity, planetUpdateDto);
    await this.fileImagesService.deleteFiles(planet.images);
    newPlanet.images = await this.fileImagesService.appendFiles(files);
    return this.planetRepository.save({ ...planet, ...newPlanet });
  }

  async delete(id: number) {
    const planet = await this.planetRepository.findOneBy({ id });
    const info: PlanetEntity = await this.planetRepository.remove(planet);
    await this.fileImagesService.deleteFiles(info.images);
    return info;
  }

  async createRelationWith(id: number, planetRelationDto: PlanetRelationDto) {
    await createRelation(id, planetRelationDto, PlanetEntity);
  }
}
