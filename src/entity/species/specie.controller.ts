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
import { SpecieService } from './specie.service';
import { SpecieCreateDto } from './specieDto/specie.create.dto';
import { SpecieUpdateDto } from './specieDto/specie.update.dto';
import { SpecieRelationDto } from './specieDto/specie.relation.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../../auth/guards/jwt-guard';
import { RolesGuard } from '../../auth/guards/roles-guard';
import { Role, Roles } from '../../decorators/roles.decorator';

@ApiTags('Species')
@UseGuards(JwtGuard, RolesGuard)
@Controller('species')
export class SpecieController {
  constructor(private readonly specieService: SpecieService) {}

  @ApiBearerAuth()
  @Get('get')
  @Roles(Role.User, Role.Admin)
  getFew(
    @Query('skip', ParseIntPipe) skip: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return this.specieService.getFew(skip, limit);
  }

  @ApiBearerAuth()
  @Get('get/:id')
  @Roles(Role.User, Role.Admin)
  @ApiParam({ name: 'id' })
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.specieService.getOne(id);
  }

  @ApiBearerAuth()
  @Post('create')
  @Roles(Role.Admin)
  @UseInterceptors(FilesInterceptor('files'))
  @ApiConsumes('multipart/form-data')
  create(
    @Body() body: SpecieCreateDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.specieService.create(body, files);
  }

  @ApiBearerAuth()
  @Put('update/:id')
  @Roles(Role.Admin)
  @UseInterceptors(FilesInterceptor('files'))
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'id' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: SpecieUpdateDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.specieService.update(body, files, id);
  }

  @ApiBearerAuth()
  @Delete('delete/:id')
  @Roles(Role.Admin)
  @ApiParam({ name: 'id' })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.specieService.delete(id);
  }

  @ApiBearerAuth()
  @Post('relation/:id')
  @Roles(Role.Admin)
  createRelationWith(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: SpecieRelationDto,
  ) {
    return this.specieService.createRelationWith(id, body);
  }
}
