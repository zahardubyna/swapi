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
  UseInterceptors,
} from '@nestjs/common';
import { StarshipService } from './starship.service';
import { StarshipCreateDto } from '@entities/starships/dto/starship.create.dto';
import { StarshipUpdateDto } from '@entities/starships/dto/starship.update.dto';
import { StarshipRelationDto } from '@entities/starships/dto/starship.relation.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UsePermissionsGuard } from '@casl/guards/permission.guard';
import { Actions } from '@casl/actions.enum';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { StarshipEntity } from '@entities/starships/entity/starship.entity';
import { ApiBaseResponses } from '../../common/decorators/api-base-response.decorator';

@ApiTags('Starships')
@ApiBearerAuth()
@ApiBaseResponses()
@Controller('starships')
export class StarshipController {
  constructor(private readonly starshipServices: StarshipService) {}

  @Get()
  @UsePermissionsGuard(Actions.get, StarshipEntity)
  @ApiOperation({ summary: 'Get few starships' })
  @ApiOkResponse({ type: StarshipEntity, isArray: true })
  getFew(
    @Query('skip', ParseIntPipe) skip: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return this.starshipServices.getFew(skip, limit);
  }

  @Get(':id')
  @UsePermissionsGuard(Actions.get, StarshipEntity)
  @ApiParam({ name: 'id' })
  @ApiOperation({ summary: 'Get unique starship' })
  @ApiOkResponse({ type: StarshipEntity })
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.starshipServices.getOne(id);
  }

  @Post()
  @UsePermissionsGuard(Actions.create, StarshipEntity)
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
  @UsePermissionsGuard(Actions.update, StarshipEntity)
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
  @UsePermissionsGuard(Actions.delete, StarshipEntity)
  @ApiParam({ name: 'id' })
  @ApiOperation({ summary: 'Delete starship' })
  @ApiOkResponse({ type: StarshipEntity })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.starshipServices.delete(id);
  }

  @Post('relation/:id')
  @UsePermissionsGuard(Actions.update, StarshipEntity)
  @ApiOperation({ summary: 'Create starship relations with' })
  @ApiCreatedResponse({ type: StarshipEntity })
  createRelationWith(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: StarshipRelationDto,
  ) {
    return this.starshipServices.createRelationWith(id, body);
  }
}
