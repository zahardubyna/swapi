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
import { FilmService } from './film.service';
import { FilmCreateDto } from './filmDto/film.create.dto';
import { FilmUpdateDto } from './filmDto/film.update.dto';
import { FilmRelationDto } from './filmDto/film.relation.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiParam } from '@nestjs/swagger';

@Controller('films')
export class FilmController {
  constructor(private readonly filmServices: FilmService) {}

  @Get('get')
  getAll(@Query('skip') skip: number, @Query('limit') limit: number) {
    return this.filmServices.getFilms(skip, limit);
  }

  @Post('create')
  @UseInterceptors(FilesInterceptor('files'))
  @ApiConsumes('multipart/form-data')
  getCreate(
    @Body() body: FilmCreateDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.filmServices.createFilm(body, files);
  }

  @Put('update/:id')
  @UseInterceptors(FilesInterceptor('files'))
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'id' })
  getUpdate(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: FilmUpdateDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.filmServices.updateFilm(body, files, id);
  }

  @Delete('delete/:id')
  @ApiParam({ name: 'id' })
  getDelete(@Param('id', ParseIntPipe) id: number) {
    return this.filmServices.deleteFilm(id);
  }

  @Post('relation/:id')
  createRelationWith(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: FilmRelationDto,
  ) {
    return this.filmServices.createRelationFilm(id, body);
  }
}
