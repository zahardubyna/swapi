import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PeopleEntity } from './peoplerEntity/people.entity';
import { Repository } from 'typeorm';
import { PeopleCreateDto } from './peopleDto/people.create.dto';
import { PeopleDeleteDto } from './peopleDto/people.delete.dto';

@Injectable()
export class PeopleService {
  constructor(
    @InjectRepository(PeopleEntity)
    private peopleRepository: Repository<PeopleEntity>,
  ) {}
  getAllPeople() {
    return this.peopleRepository.find();
  }

  createPeople(peopleDto: PeopleCreateDto) {
    const newPeople: PeopleEntity = this.peopleRepository.create(peopleDto);

    return this.peopleRepository.save(newPeople);
  }

  async updatePeople(id: number, peopleDto: PeopleCreateDto) {
    // return peopleDto;
    const updatedPeople = await this.peopleRepository.findOneBy({ id });

    return this.peopleRepository.save({ ...updatedPeople, ...peopleDto });
  }

  async deletePeople(peopleDeleteDto: PeopleDeleteDto) {
    console.log(peopleDeleteDto.id);
    const deletedPeople = await this.peopleRepository.findOneBy({
      id: peopleDeleteDto.id,
    });

    return this.peopleRepository.remove(deletedPeople);
  }
}
