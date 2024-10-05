import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { SpecieEntity } from './specieEntity/specie.entity';
import { FileImagesService } from '@file.services/images/images.service';
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

  async getFew(skip: number, limit: number) {
    return this.specieRepository.find({ skip: skip, take: limit });
  }

  async getOne(id: number) {
    return this.specieRepository.findOne({ where: { id } });
  }

  async create(
    speciesCreateDto: SpecieCreateDto,
    files: Express.Multer.File[],
  ) {
    const specie = plainToInstance(SpecieEntity, speciesCreateDto);
    specie.images = await this.fileImagesService.appendFiles(files);
    return this.specieRepository.save(specie);
  }

  async update(
    specieUpdateDto: SpecieUpdateDto,
    files: Express.Multer.File[],
    id: number,
  ) {
    const specie = await this.specieRepository.findOneBy({ id });
    const newSpecie = plainToInstance(SpecieEntity, specieUpdateDto);
    await this.fileImagesService.deleteFiles(specie.images);
    newSpecie.images = await this.fileImagesService.appendFiles(files);
    return this.specieRepository.save({ ...specie, ...newSpecie });
  }

  async delete(id: number) {
    const specie = await this.specieRepository.findOneBy({ id });
    const info = await this.specieRepository.remove(specie);
    await this.fileImagesService.deleteFiles(info.images);
    return info;
  }

  async createRelationWith(id: number, specieRelationDto: SpecieRelationDto) {
    await createRelation(id, specieRelationDto, SpecieEntity);
  }
}
