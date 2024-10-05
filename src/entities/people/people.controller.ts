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
import { PeopleService } from './people.service';
import { PeopleCreateDto } from './peopleDto/people.create.dto';
import { PeopleUpdateDto } from './peopleDto/people.update.dto';
import { PeopleRelationDto } from './peopleDto/people.relation.dto';
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
import { PeopleEntity } from './peopleEntity/people.entity';
import { ApiBaseResponse } from '@decorators/api-base-response.decorator';

@ApiTags('People')
@ApiBearerAuth()
@ApiBaseResponse()
@Controller('people')
export class PeopleController {
  constructor(private readonly peopleServices: PeopleService) {}

  @Get()
  @UsePermissionsGuard(EntitiesActions.get, PeopleEntity)
  @ApiOperation({ summary: 'Get few people' })
  @ApiOkResponse({ type: PeopleEntity, isArray: true })
  getFew(
    @Query('skip', ParseIntPipe) skip: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return this.peopleServices.getFew(skip, limit);
  }

  @Get(':id')
  @UsePermissionsGuard(EntitiesActions.get, PeopleEntity)
  @ApiParam({ name: 'id' })
  @ApiOperation({ summary: 'Get unique person' })
  @ApiOkResponse({ type: PeopleEntity })
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.peopleServices.getOne(id);
  }

  @Post()
  @UsePermissionsGuard(EntitiesActions.create, PeopleEntity)
  @UseInterceptors(FilesInterceptor('files'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Create person' })
  @ApiCreatedResponse({ type: PeopleEntity })
  create(
    @Body() body: PeopleCreateDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.peopleServices.create(body, files);
  }

  @Put(':id')
  @UsePermissionsGuard(EntitiesActions.update, PeopleEntity)
  @UseInterceptors(FilesInterceptor('files'))
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'id' })
  @ApiOperation({ summary: 'Update person' })
  @ApiOkResponse({ type: PeopleEntity })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: PeopleUpdateDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.peopleServices.update(body, files, id);
  }

  @Delete(':id')
  @UsePermissionsGuard(EntitiesActions.delete, PeopleEntity)
  @ApiParam({ name: 'id' })
  @ApiOperation({ summary: 'Delete person' })
  @ApiOkResponse({ type: PeopleEntity })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.peopleServices.delete(id);
  }

  @Put('relation/:id')
  @UsePermissionsGuard(EntitiesActions.update, PeopleEntity)
  @ApiOperation({ summary: 'Create person relations with' })
  @ApiCreatedResponse({ type: PeopleEntity })
  createRelationWith(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: PeopleRelationDto,
  ) {
    return this.peopleServices.createRelationWith(id, body);
  }
}
