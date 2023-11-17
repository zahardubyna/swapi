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
  UseGuards,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiParam, ApiTags } from '@nestjs/swagger';
import { PlanetService } from './planet.service';
import { PlanetCreateDto } from './planetDto/planet.create.dto';
import { PlanetUpdateDto } from './planetDto/planet.update.dto';
import { PlanetRelationDto } from './planetDto/planet.relation.dto';
import { JwtGuard } from '../../auth/guards/jwt-guard';
import { RolesGuard } from '../../auth/guards/roles-guard';
import { Role, Roles } from '../../decorators/roles.decorator';

@ApiTags('Planets')
@UseGuards(JwtGuard, RolesGuard)
@Controller('planet')
export class PlanetController {
  constructor(private readonly planetServices: PlanetService) {}

  @ApiBearerAuth()
  @Get('get')
  @Roles(Role.User, Role.Admin)
  getFew(
    @Query('skip', ParseIntPipe) skip: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return this.planetServices.getFew(skip, limit);
  }

  @ApiBearerAuth()
  @Get('get/:id')
  @Roles(Role.User, Role.Admin)
  @ApiParam({ name: 'id' })
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.planetServices.getOne(id);
  }

  @ApiBearerAuth()
  @Post('create')
  @Roles(Role.Admin)
  @UseInterceptors(FilesInterceptor('files'))
  @ApiConsumes('multipart/form-data')
  create(
    @Body() body: PlanetCreateDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.planetServices.create(body, files);
  }

  @ApiBearerAuth()
  @Put('update/:id')
  @Roles(Role.Admin)
  @UseInterceptors(FilesInterceptor('files'))
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'id' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: PlanetUpdateDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.planetServices.update(body, files, id);
  }
  @ApiBearerAuth()
  @Delete('delete/:id')
  @Roles(Role.Admin)
  @ApiParam({ name: 'id' })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.planetServices.delete(id);
  }

  @ApiBearerAuth()
  @Post('relation/:id')
  @Roles(Role.Admin)
  createRelationWith(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: PlanetRelationDto,
  ) {
    return this.planetServices.createRelationWith(id, body);
  }
}
