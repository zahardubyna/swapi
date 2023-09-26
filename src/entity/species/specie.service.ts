import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { SpecieEntity } from './specieEntity/specie.entity';
import { FileImagesService } from '../../file.services/images/images.service';
import { SpecieCreateDto } from './specieDto/specie.create.dto';
import { SpecieUpdateDto } from './specieDto/specie.update.dto';
import { SpecieRelationDto } from './specieDto/specie.relation.dto';
import { createRelation } from '../../relation/create.relation';

@Injectable()
export class SpecieService {
  constructor(
    @InjectRepository(SpecieEntity)
    private readonly specieRepository: Repository<SpecieEntity>,
    private fileImagesService: FileImagesService,
  ) {}

  async getSpecies(skip, limit) {
    return this.specieRepository.find({ skip: skip, take: limit });
  }

  async createSpecie(
    speciesCreateDto: SpecieCreateDto,
    files: Express.Multer.File[],
  ) {
    const newSpecies = plainToInstance(SpecieEntity, speciesCreateDto);
    newSpecies.images = await this.fileImagesService.appendFiles(files);
    return this.specieRepository.save(newSpecies);
  }

  async updateSpecie(
    specieUpdateDto: SpecieUpdateDto,
    files: Express.Multer.File[],
    id: number,
  ) {
    const updatedSpecie = await this.specieRepository.findOneBy({ id });
    const newSpecie = plainToInstance(SpecieEntity, specieUpdateDto);
    await this.fileImagesService.deleteFiles(updatedSpecie.images);
    newSpecie.images = await this.fileImagesService.appendFiles(files);
    return this.specieRepository.save({ ...updatedSpecie, ...newSpecie });
  }

  async deleteSpecie(id: number) {
    const deletedSpecie = await this.specieRepository.findOneBy({ id });
    const deletedInfo = await this.specieRepository.remove(deletedSpecie);
    await this.fileImagesService.deleteFiles(deletedInfo.images);
    return deletedInfo;
  }

  async createRelationSpecie(id: number, specieRelationDto: SpecieRelationDto) {
    await createRelation(id, specieRelationDto, SpecieEntity);
  }
}
