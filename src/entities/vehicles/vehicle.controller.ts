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
import { VehicleService } from './vehicle.service';
import { VehicleCreateDto } from './vehicleDto/vehicle.create.dto';
import { VehicleUpdateDto } from './vehicleDto/vehicle.update.dto';
import { VehicleRelationDto } from './vehicleDto/vehicle.relation.dto';
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
import { VehicleEntity } from '@entities/vehicles/vehicleEntity/vehicle.entity';
import { ApiBaseResponse } from '@decorators/api-base-response.decorator';


@ApiTags('Vehicles')
@ApiBearerAuth()
@ApiBaseResponse()

@Controller('vehicles')
export class VehicleController {
  constructor(private readonly vehicleServices: VehicleService) {}

  @Get()
  @UsePermissionsGuard(EntitiesActions.get, VehicleEntity)
  @ApiOperation({ summary: 'Get few vehicle' })
  @ApiOkResponse({ type: VehicleEntity, isArray: true })
  getFew(
    @Query('skip', ParseIntPipe) skip: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return this.vehicleServices.getFew(skip, limit);
  }

  @Get(':id')
  @UsePermissionsGuard(EntitiesActions.get, VehicleEntity)
  @ApiParam({ name: 'id' })
  @ApiOperation({ summary: 'Get unique vehicle' })
  @ApiOkResponse({ type: VehicleEntity })
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.vehicleServices.getOne(id);
  }

  @Post()
  @UsePermissionsGuard(EntitiesActions.create, VehicleEntity)
  @UseInterceptors(FilesInterceptor('files'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Create vehicle' })
  @ApiCreatedResponse({ type: VehicleEntity })
  create(
    @Body() body: VehicleCreateDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.vehicleServices.create(body, files);
  }

  @Put(':id')
  @UsePermissionsGuard(EntitiesActions.update, VehicleEntity)
  @UseInterceptors(FilesInterceptor('files'))
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'id' })
  @ApiOperation({ summary: 'Update vehicle' })
  @ApiOkResponse({ type: VehicleEntity })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: VehicleUpdateDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.vehicleServices.update(body, files, id);
  }

  @Delete(':id')
  @UsePermissionsGuard(EntitiesActions.delete, VehicleEntity)
  @ApiParam({ name: 'id' })
  @ApiOperation({ summary: 'Delete vehicle' })
  @ApiOkResponse({ type: VehicleEntity })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.vehicleServices.delete(id);
  }

  @Post('relation/:id')
  @UsePermissionsGuard(EntitiesActions.update, VehicleEntity)
  @ApiOperation({ summary: 'Create vehicle relations with' })
  @ApiCreatedResponse({ type: VehicleEntity })
  createRelationWith(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: VehicleRelationDto,
  ) {
    return this.vehicleServices.createRelationWith(id, body);
  }
}
