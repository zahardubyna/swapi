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
import { StarshipService } from './starship.service';
import { StarshipCreateDto } from './starshipsDto/starship.create.dto';
import { StarshipUpdateDto } from './starshipsDto/starship.update.dto';
import { StarshipRelationDto } from './starshipsDto/starship.relation.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiParam } from '@nestjs/swagger';

@Controller('starships')
export class StarshipController {
  constructor(private readonly starshipServices: StarshipService) {}

  @Get('get')
  getAll(@Query('skip') skip: number, @Query('limit') limit: number) {
    return this.starshipServices.getStarships(skip, limit);
  }

  @Post('create')
  @UseInterceptors(FilesInterceptor('files'))
  @ApiConsumes('multipart/form-data')
  getCreate(
    @Body() body: StarshipCreateDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.starshipServices.createStarship(body, files);
  }

  @Put('update/:id')
  @UseInterceptors(FilesInterceptor('files'))
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'id' })
  getUpdate(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: StarshipUpdateDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.starshipServices.updateStarship(body, files, id);
  }

  @Delete('delete/:id')
  @ApiParam({ name: 'id' })
  getDelete(@Param('id', ParseIntPipe) id: number) {
    return this.starshipServices.deleteStarship(id);
  }

  @Post('relation/:id')
  createRelationWith(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: StarshipRelationDto,
  ) {
    return this.starshipServices.createRelationStarship(id, body);
  }
}
