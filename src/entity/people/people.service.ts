import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { PeopleEntity } from './peopleEntity/people.entity';
import { FileImagesService } from '../../file.services/images/images.service';
import { PeopleCreateDto } from './peopleDto/people.create.dto';
import { PeopleUpdateDto } from './peopleDto/people.update.dto';
import { PeopleRelationDto } from './peopleDto/people.relation.dto';
import { createRelation } from '../../relation/create.relation';

@Injectable()
export class PeopleService {
  constructor(
    @InjectRepository(PeopleEntity)
    private readonly peopleRepository: Repository<PeopleEntity>,
    private fileImagesService: FileImagesService,
  ) {}

  async getFew(skip: number, limit: number) {
    return this.peopleRepository.find({ skip: skip, take: limit });
  }

  async getOne(id: number) {
    return this.peopleRepository.findOne({ where: { id } });
  }

  async create(peopleCreateDto: PeopleCreateDto, files: Express.Multer.File[]) {
    const person = plainToInstance(PeopleEntity, peopleCreateDto);
    person.images = await this.fileImagesService.appendFiles(files);
    return this.peopleRepository.save(person);
  }

  async update(
    peopleUpdateDto: PeopleUpdateDto,
    files: Express.Multer.File[],
    id: number,
  ) {
    const person = await this.peopleRepository.findOneBy({ id });
    const newPerson = plainToInstance(PeopleEntity, peopleUpdateDto);
    await this.fileImagesService.deleteFiles(person.images);
    newPerson.images = await this.fileImagesService.appendFiles(files);
    return this.peopleRepository.save({ ...person, ...newPerson });
  }

  async delete(id: number) {
    const person = await this.peopleRepository.findOneBy({ id });
    const info: PeopleEntity = await this.peopleRepository.remove(person);
    await this.fileImagesService.deleteFiles(info.images);
    return info;
  }

  async createRelationWith(id: number, peopleRelationDto: PeopleRelationDto) {
    await createRelation(id, peopleRelationDto, PeopleEntity);
  }
}
