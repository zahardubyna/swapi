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
import { VehicleService } from './vehicle.service';
import { VehicleCreateDto } from './vehicleDto/vehicle.create.dto';
import { VehicleUpdateDto } from './vehicleDto/vehicle.update.dto';
import { VehicleRelationDto } from './vehicleDto/vehicle.relation.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../../auth/guards/jwt-guard';
import { RolesGuard } from '../../auth/guards/roles-guard';
import { Role, Roles } from '../../decorators/roles.decorator';

@ApiTags('Vehicles')
@UseGuards(JwtGuard, RolesGuard)
@Controller('vehicles')
export class VehicleController {
  constructor(private readonly vehicleServices: VehicleService) {}

  @ApiBearerAuth()
  @Get('get')
  @Roles(Role.User, Role.Admin)
  getFew(
    @Query('skip', ParseIntPipe) skip: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return this.vehicleServices.getFew(skip, limit);
  }

  @ApiBearerAuth()
  @Get('get/:id')
  @Roles(Role.User, Role.Admin)
  @ApiParam({ name: 'id' })
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.vehicleServices.getOne(id);
  }

  @ApiBearerAuth()
  @Post('create')
  @Roles(Role.Admin)
  @UseInterceptors(FilesInterceptor('files'))
  @ApiConsumes('multipart/form-data')
  create(
    @Body() body: VehicleCreateDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.vehicleServices.create(body, files);
  }

  @ApiBearerAuth()
  @Put('update/:id')
  @Roles(Role.Admin)
  @UseInterceptors(FilesInterceptor('files'))
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'id' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: VehicleUpdateDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.vehicleServices.update(body, files, id);
  }

  @ApiBearerAuth()
  @Delete('delete/:id')
  @Roles(Role.Admin)
  @ApiParam({ name: 'id' })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.vehicleServices.delete(id);
  }

  @ApiBearerAuth()
  @Post('relation/:id')
  @Roles(Role.Admin)
  createRelationWith(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: VehicleRelationDto,
  ) {
    return this.vehicleServices.createRelationWith(id, body);
  }
}
