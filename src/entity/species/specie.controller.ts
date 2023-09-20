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
import { SpecieService } from './specie.service';
import { SpecieCreateDto } from './specieDto/specie.create.dto';
import { SpecieUpdateDto } from './specieDto/specie.update.dto';
import { SpecieRelationDto } from './specieDto/specie.relation.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiParam } from '@nestjs/swagger';

@Controller('species')
export class SpecieController {
  constructor(private readonly specieService: SpecieService) {}

  @Get('get')
  getAll(@Query('skip') skip: number, @Query('limit') limit: number) {
    return this.specieService.getSpecies(skip, limit);
  }

  @Post('create')
  @UseInterceptors(FilesInterceptor('files'))
  @ApiConsumes('multipart/form-data')
  getCreate(
    @Body() body: SpecieCreateDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.specieService.createSpecie(body, files);
  }

  @Put('update/:id')
  @UseInterceptors(FilesInterceptor('files'))
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'id' })
  getUpdate(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: SpecieUpdateDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.specieService.updateSpecie(body, files, id);
  }

  @Delete('delete/:id')
  @ApiParam({ name: 'id' })
  getDelete(@Param('id', ParseIntPipe) id: number) {
    return this.specieService.deleteSpecie(id);
  }

  @Post('relation/:id')
  createRelationWith(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: SpecieRelationDto,
  ) {
    return this.specieService.createRelationSpecie(id, body);
  }
}
