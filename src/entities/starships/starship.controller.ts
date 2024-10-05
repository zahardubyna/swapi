import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { StarshipService } from './starship.service';
import { StarshipCreateDto } from './starshipDto/starship.create.dto';
import { StarshipUpdateDto } from './starshipDto/starship.update.dto';
import { StarshipRelationDto } from './starshipDto/starship.relation.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UsePermissionsGuard } from '@casl/guards/permission.guard';
import { EntitiesActions } from '@entities/entity.permissions';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { StarshipEntity } from '@entities/starships/starshipEntity/starship.entity';
import { ApiBaseResponse } from '@decorators/api-base-response.decorator';


@ApiTags('Starships')
@ApiBearerAuth()
@ApiBaseResponse()

@Controller('starships')
export class StarshipController {
  constructor(private readonly starshipServices: StarshipService) {}

  @Get()
  @UsePermissionsGuard(EntitiesActions.get, StarshipEntity)
  @ApiOperation({ summary: 'Get few starships' })
  @ApiOkResponse({ type: StarshipEntity, isArray: true })
  getFew(
    @Query('skip', ParseIntPipe) skip: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return this.starshipServices.getFew(skip, limit);
  }

  @Get(':id')
  @UsePermissionsGuard(EntitiesActions.get, StarshipEntity)
  @ApiParam({ name: 'id' })
  @ApiOperation({ summary: 'Get unique starship' })
  @ApiOkResponse({ type: StarshipEntity })
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.starshipServices.getOne(id);
  }

  @Post()
  @UsePermissionsGuard(EntitiesActions.create, StarshipEntity)
  @UseInterceptors(FilesInterceptor('files'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Create starship' })
  @ApiCreatedResponse({ type: StarshipEntity })
  create(
    @Body() body: StarshipCreateDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.starshipServices.create(body, files);
  }

  @Put(':id')
  @UsePermissionsGuard(EntitiesActions.update, StarshipEntity)
  @UseInterceptors(FilesInterceptor('files'))
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'id' })
  @ApiOperation({ summary: 'Update starship' })
  @ApiOkResponse({ type: StarshipEntity })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: StarshipUpdateDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.starshipServices.update(body, files, id);
  }

  @Delete(':id')
  @UsePermissionsGuard(EntitiesActions.delete, StarshipEntity)
  @ApiParam({ name: 'id' })
  @ApiOperation({ summary: 'Delete starship' })
  @ApiOkResponse({ type: StarshipEntity })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.starshipServices.delete(id);
  }

  @Post('relation/:id')
  @UsePermissionsGuard(EntitiesActions.update, StarshipEntity)
  @ApiOperation({ summary: 'Create starship relations with' })
  @ApiCreatedResponse({ type: StarshipEntity })
  createRelationWith(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: StarshipRelationDto,
  ) {
    return this.starshipServices.createRelationWith(id, body);
  }
}
