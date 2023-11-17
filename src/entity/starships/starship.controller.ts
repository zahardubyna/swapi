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
import { ApiBearerAuth, ApiConsumes, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../../auth/guards/jwt-guard';
import { RolesGuard } from '../../auth/guards/roles-guard';
import { Role, Roles } from '../../decorators/roles.decorator';

@ApiTags('Starships')
@UseGuards(JwtGuard, RolesGuard)
@Controller('starships')
export class StarshipController {
  constructor(private readonly starshipServices: StarshipService) {}

  @ApiBearerAuth()
  @Get('get')
  @Roles(Role.User, Role.Admin)
  getFew(
    @Query('skip', ParseIntPipe) skip: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return this.starshipServices.getFew(skip, limit);
  }

  @ApiBearerAuth()
  @Get('get/:id')
  @Roles(Role.User, Role.Admin)
  @ApiParam({ name: 'id' })
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.starshipServices.getOne(id);
  }

  @ApiBearerAuth()
  @Post('create')
  @Roles(Role.Admin)
  @UseInterceptors(FilesInterceptor('files'))
  @ApiConsumes('multipart/form-data')
  create(
    @Body() body: StarshipCreateDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.starshipServices.create(body, files);
  }

  @ApiBearerAuth()
  @Put('update/:id')
  @Roles(Role.Admin)
  @UseInterceptors(FilesInterceptor('files'))
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'id' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: StarshipUpdateDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.starshipServices.update(body, files, id);
  }

  @ApiBearerAuth()
  @Delete('delete/:id')
  @Roles(Role.Admin)
  @ApiParam({ name: 'id' })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.starshipServices.delete(id);
  }

  @ApiBearerAuth()
  @Post('relation/:id')
  @Roles(Role.Admin)
  createRelationWith(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: StarshipRelationDto,
  ) {
    return this.starshipServices.createRelationWith(id, body);
  }
}
