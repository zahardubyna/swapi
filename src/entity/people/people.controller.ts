import { Body, Controller, Delete, Get, Post, Put, Param } from "@nestjs/common";
import { PeopleService } from './people.service';
import { PeopleCreateDto } from './peopleDto/people.create.dto';
import { PeopleUpdateDto } from './peopleDto/people.update.dto';
import { PeopleDeleteDto } from './peopleDto/people.delete.dto';

@Controller('people')
export class PeopleController {
  constructor(private readonly peopleServices: PeopleService) {}
  @Get()
  getAll() {
    return this.peopleServices.getAllPeople();
  }
  @Post()
  getCreate(@Body() body: PeopleCreateDto) {
    // console.log(body);
    return this.peopleServices.createPeople(body);
  }

  @Put('')
  getUpdate(@Body() body: PeopleUpdateDto) {
    return this.peopleServices.updatePeople(+body.id, body);
  }

  @Delete()
  getDelete(@Body() body: PeopleDeleteDto) {
    console.log(body);
    return this.peopleServices.deletePeople(body);
  }
}
