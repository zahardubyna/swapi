import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UseInterceptors,
  UploadedFiles,
  Query,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { PeopleService } from './people.service';
import { PeopleCreateDto } from './peopleDto/people.create.dto';
import { PeopleUpdateDto } from './peopleDto/people.update.dto';
import { PeopleRelationDto } from './peopleDto/people.relation.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiParam } from '@nestjs/swagger';

@Controller('people')
export class PeopleController {
  constructor(private readonly peopleServices: PeopleService) {}

  @Get('get')
  getAll(@Query('skip') skip: number, @Query('limit') limit: number) {
    return this.peopleServices.getPeople(skip, limit);
  }

  @Post('create')
  @UseInterceptors(FilesInterceptor('files'))
  @ApiConsumes('multipart/form-data')
  getCreate(
    @Body() body: PeopleCreateDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.peopleServices.createPeople(body, files);
  }

  @Put('update/:id')
  @UseInterceptors(FilesInterceptor('files'))
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'id' })
  getUpdate(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: PeopleUpdateDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.peopleServices.updatePeople(body, files, id);
  }

  @Delete('delete/:id')
  @ApiParam({ name: 'id' })
  getDelete(@Param('id', ParseIntPipe) id: number) {
    return this.peopleServices.deletePeople(id);
  }

  @Post('relation/:id')
  createRelationWith(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: PeopleRelationDto,
  ) {
    return this.peopleServices.createRelationPeople(id, body);
  }
}
