import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PeopleEntity } from './peopleEntity/people.entity';
import { Repository } from 'typeorm';
import { PeopleCreateDto } from './peopleDto/people.create.dto';
import { PeopleUpdateDto } from './peopleDto/people.update.dto';
import { PeopleRelationDto } from './peopleDto/people.relation.dto';
import { FileImagesService } from '../../file.services/images/images.service';
import { plainToInstance } from 'class-transformer';
import { createRelation } from '../relation/create.relation';

@Injectable()
export class PeopleService {
  constructor(
    @InjectRepository(PeopleEntity)
    private readonly peopleRepository: Repository<PeopleEntity>,
    private fileImagesService: FileImagesService,
  ) {}

  async getPeople(skip, limit) {
    return this.peopleRepository.find({ skip: skip, take: limit });
  }

  async createPeople(
    peopleCreateDto: PeopleCreateDto,
    files: Express.Multer.File[],
  ) {
    const newPeople = plainToInstance(PeopleEntity, peopleCreateDto);
    newPeople.images = await this.fileImagesService.appendFiles(files);
    return this.peopleRepository.save(newPeople);
  }

  async updatePeople(
    peopleUpdateDto: PeopleUpdateDto,
    files: Express.Multer.File[],
    id: number,
  ) {
    const updatedPeople = await this.peopleRepository.findOneBy({ id });
    const newPeople = plainToInstance(PeopleEntity, peopleUpdateDto);
    await this.fileImagesService.deleteFiles(updatedPeople.images);
    newPeople.images = await this.fileImagesService.appendFiles(files);
    return this.peopleRepository.save({ ...updatedPeople, ...newPeople });
  }

  async deletePeople(id: number) {
    const deletedPeople = await this.peopleRepository.findOneBy({ id });
    const deletedInfo = await this.peopleRepository.remove(deletedPeople);
    await this.fileImagesService.deleteFiles(deletedInfo.images);
    return deletedInfo;
  }

  async createRelationPeople(id: number, peopleRelationDto: PeopleRelationDto) {
    await createRelation(id, peopleRelationDto, PeopleEntity);
  }
}
