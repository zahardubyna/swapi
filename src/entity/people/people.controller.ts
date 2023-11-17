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
import { ApiBearerAuth, ApiConsumes, ApiParam, ApiTags } from '@nestjs/swagger';
import { Role, Roles } from '../../decorators/roles.decorator';
import { RolesGuard } from '../../auth/guards/roles-guard';
import { JwtGuard } from '../../auth/guards/jwt-guard';

@ApiTags('People')
@UseGuards(JwtGuard, RolesGuard)
@Controller('people')
export class PeopleController {
  constructor(private readonly peopleServices: PeopleService) {}
  @ApiBearerAuth()
  @Get('get')
  @Roles(Role.User, Role.Admin)
  getFew(
    @Query('skip', ParseIntPipe) skip: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return this.peopleServices.getFew(skip, limit);
  }

  @ApiBearerAuth()
  @Get('get/:id')
  @Roles(Role.User, Role.Admin)
  @ApiParam({ name: 'id' })
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.peopleServices.getOne(id);
  }

  @ApiBearerAuth()
  @Post('create')
  @Roles(Role.Admin)
  @UseInterceptors(FilesInterceptor('files'))
  @ApiConsumes('multipart/form-data')
  create(
    @Body() body: PeopleCreateDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.peopleServices.create(body, files);
  }

  @ApiBearerAuth()
  @Put('update/:id')
  @Roles(Role.Admin)
  @UseInterceptors(FilesInterceptor('files'))
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'id' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: PeopleUpdateDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.peopleServices.update(body, files, id);
  }

  @ApiBearerAuth()
  @Delete('delete/:id')
  @Roles(Role.Admin)
  @ApiParam({ name: 'id' })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.peopleServices.delete(id);
  }

  @ApiBearerAuth()
  @Post('relation/:id')
  @Roles(Role.Admin)
  createRelationWith(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: PeopleRelationDto,
  ) {
    return this.peopleServices.createRelationWith(id, body);
  }
}
