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
import { FilmEntity } from '@entities/films/entity/film.entity';
import { FilmCreateDto } from '@entities/films/dto/film.create.dto';
import { FilmUpdateDto } from '@entities/films/dto/film.update.dto';
import { FilmRelationDto } from '@entities/films/dto/film.relation.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UsePermissionsGuard } from '@casl/guards/permission.guard';
import { EntitiesActions } from '@entities/entity.permissions';
import {
  ApiBearerAuth,
  ApiConsumes, ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ApiBaseResponse } from '../../common/decorators/api-base-response.decorator';

@ApiTags('Films')
@ApiBearerAuth()
@ApiBaseResponse()
@Controller('films')
export class FilmController {
  constructor(private readonly filmServices: FilmService) {}

  @Get()
  @UsePermissionsGuard(EntitiesActions.get, FilmEntity)
  @ApiOperation({ summary: 'Get few films' })
  @ApiOkResponse({ type: FilmEntity, isArray: true })
  getFew(
    @Query('skip', ParseIntPipe) skip: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return this.filmServices.getFew(skip, limit);
  }

  
  @Get(':id')
  @UsePermissionsGuard(EntitiesActions.get, FilmEntity)
  @ApiParam({ name: 'id' })
  @ApiOperation({ summary: 'Get unique film' })
  @ApiOkResponse({ type: FilmEntity })
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.filmServices.getOne(id);
  }

  @Post()
  @UsePermissionsGuard(EntitiesActions.create, FilmEntity)
  @UseInterceptors(FilesInterceptor('files'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Create film' })
  @ApiCreatedResponse({ type: FilmEntity })
  create(
    @Body() body: FilmCreateDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.filmServices.create(body, files);
  }

  
  @Put(':id')
  @UsePermissionsGuard(EntitiesActions.update, FilmEntity)
  @UseInterceptors(FilesInterceptor('files'))
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'id' })
  @ApiOperation({ summary: 'Update film' })
  @ApiOkResponse({ type: FilmEntity })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: FilmUpdateDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.filmServices.update(body, files, id);
  }

  @Delete(':id')
  @UsePermissionsGuard(EntitiesActions.delete, FilmEntity)
  @ApiParam({ name: 'id' })
  @ApiOperation({ summary: 'Delete film' })
  @ApiOkResponse({ type: FilmEntity })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.filmServices.delete(id);
  }

  @Post('relation/:id')
  @UsePermissionsGuard(EntitiesActions.update, FilmEntity)
  @ApiOperation({ summary: 'Create film relations with' })
  @ApiCreatedResponse({ type: FilmEntity })
  createRelationWith(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: FilmRelationDto,
  ) {
    return this.filmServices.createRelationWith(id, body);
  }
}
