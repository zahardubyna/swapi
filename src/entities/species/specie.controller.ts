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
import { SpecieCreateDto } from '@entities/species/dto/specie.create.dto';
import { SpecieUpdateDto } from '@entities/species/dto/specie.update.dto';
import { SpecieRelationDto } from '@entities/species/dto/specie.relation.dto';
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
import { SpecieEntity } from '@entities/species/entity/specie.entity';
import { ApiBaseResponse } from '../../common/decorators/api-base-response.decorator';

@ApiTags('Species')
@ApiBearerAuth()
@ApiBaseResponse()
@Controller('species')
export class SpecieController {
  constructor(private readonly specieService: SpecieService) {}

  @Get()
  @UsePermissionsGuard(Actions.get, SpecieEntity)
  @ApiOperation({ summary: 'Get few species' })
  @ApiOkResponse({ type: SpecieEntity, isArray: true })
  getFew(
    @Query('skip', ParseIntPipe) skip: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return this.specieService.getFew(skip, limit);
  }

  @Get(':id')
  @UsePermissionsGuard(Actions.get, SpecieEntity)
  @ApiParam({ name: 'id' })
  @ApiOperation({ summary: 'Get unique specie' })
  @ApiOkResponse({ type: SpecieEntity })
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.specieService.getOne(id);
  }

  @Post()
  @UsePermissionsGuard(Actions.create, SpecieEntity)
  @UseInterceptors(FilesInterceptor('files'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Create specie' })
  @ApiCreatedResponse({ type: SpecieEntity })
  create(
    @Body() body: SpecieCreateDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.specieService.create(body, files);
  }

  @Put(':id')
  @UsePermissionsGuard(Actions.update, SpecieEntity)
  @UseInterceptors(FilesInterceptor('files'))
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'id' })
  @ApiOperation({ summary: 'Update specie' })
  @ApiOkResponse({ type: SpecieEntity })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: SpecieUpdateDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.specieService.update(body, files, id);
  }

  @Delete(':id')
  @UsePermissionsGuard(Actions.delete, SpecieEntity)
  @ApiParam({ name: 'id' })
  @ApiOperation({ summary: 'Delete specie' })
  @ApiOkResponse({ type: SpecieEntity })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.specieService.delete(id);
  }

  @Post('relation/:id')
  @UsePermissionsGuard(Actions.update, SpecieEntity)
  @ApiOperation({ summary: 'Create specie relations with' })
  @ApiCreatedResponse({ type: SpecieEntity })
  createRelationWith(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: SpecieRelationDto,
  ) {
    return this.specieService.createRelationWith(id, body);
  }
}
