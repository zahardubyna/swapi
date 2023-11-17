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
import { FilmService } from './film.service';
import { FilmCreateDto } from './filmDto/film.create.dto';
import { FilmUpdateDto } from './filmDto/film.update.dto';
import { FilmRelationDto } from './filmDto/film.relation.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../../auth/guards/jwt-guard';
import { RolesGuard } from '../../auth/guards/roles-guard';
import { Role, Roles } from '../../decorators/roles.decorator';

@ApiTags('Films')
@UseGuards(JwtGuard, RolesGuard)
@Controller('films')
export class FilmController {
  constructor(private readonly filmServices: FilmService) {}

  @ApiBearerAuth()
  @Get('get')
  @Roles(Role.User, Role.Admin)
  getFew(
    @Query('skip', ParseIntPipe) skip: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return this.filmServices.getFew(skip, limit);
  }

  @ApiBearerAuth()
  @Get('get/:id')
  @Roles(Role.User, Role.Admin)
  @ApiParam({ name: 'id' })
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.filmServices.getOne(id);
  }

  @ApiBearerAuth()
  @Post('create')
  @Roles(Role.Admin)
  @UseInterceptors(FilesInterceptor('files'))
  @ApiConsumes('multipart/form-data')
  create(
    @Body() body: FilmCreateDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.filmServices.create(body, files);
  }

  @ApiBearerAuth()
  @Put('update/:id')
  @Roles(Role.Admin)
  @UseInterceptors(FilesInterceptor('files'))
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'id' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: FilmUpdateDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.filmServices.update(body, files, id);
  }

  @ApiBearerAuth()
  @Delete('delete/:id')
  @Roles(Role.Admin)
  @ApiParam({ name: 'id' })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.filmServices.delete(id);
  }

  @ApiBearerAuth()
  @Post('relation/:id')
  @Roles(Role.Admin)
  createRelationWith(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: FilmRelationDto,
  ) {
    return this.filmServices.createRelationWith(id, body);
  }
}
