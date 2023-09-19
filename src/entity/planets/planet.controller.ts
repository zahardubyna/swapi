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
  Param, ParseIntPipe
} from "@nestjs/common";
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiParam } from '@nestjs/swagger';
import { PlanetService } from './planet.service';
import { PlanetCreateDto } from './planetDto/planet.create.dto';
import { PlanetUpdateDto } from './planetDto/planet.update.dto';
import { PlanetRelationDto } from './planetDto/planet.relation.dto';


@Controller('planet')
export class PlanetController {
  constructor(private readonly planetServices: PlanetService) {}

  @Get('get')
  getAll(@Query('skip') skip: number, @Query('limit') limit: number) {
    return this.planetServices.getPlanets(skip, limit);
  }

  @Post('create')
  @UseInterceptors(FilesInterceptor('files'))
  @ApiConsumes('multipart/form-data')
  getCreate(
    @Body() body: PlanetCreateDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.planetServices.createPlanet(body, files);
  }

  @Put('update/:id')
  @UseInterceptors(FilesInterceptor('files'))
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'id' })
  getUpdate(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: PlanetUpdateDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.planetServices.updatePlanet(body, files, id);
  }
  @Delete('delete/:id')
  @ApiParam({ name: 'id' })
  getDelete(@Param('id', ParseIntPipe) id: number) {
    return this.planetServices.deletePlanet(id);
  }

  @Post('relation/:id')
  createRelationWith(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: PlanetRelationDto,
  ) {
    return this.planetServices.createRelationPlanet(id, body);
  }
}
