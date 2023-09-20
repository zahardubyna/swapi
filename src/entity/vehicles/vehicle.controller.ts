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
import { VehicleService } from "./vehicle.service";
import { VehicleCreateDto } from "./vehicleDto/vehicle.create.dto";
import { VehicleUpdateDto } from "./vehicleDto/vehicle.update.dto";
import { VehicleRelationDto } from "./vehicleDto/vehicle.relation.dto";
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiParam } from '@nestjs/swagger';
import { StarshipService } from "../starships/starship.service";
import { StarshipCreateDto } from "../starships/starshipDto/starship.create.dto";
import { StarshipUpdateDto } from "../starships/starshipDto/starship.update.dto";
import { StarshipRelationDto } from "../starships/starshipDto/starship.relation.dto";

@Controller('vehicles')
export class VehicleController {
  constructor(private readonly vehicleServices: VehicleService) {}

  @Get('get')
  getAll(@Query('skip') skip: number, @Query('limit') limit: number) {
    return this.vehicleServices.getVehicles(skip, limit);
  }

  @Post('create')
  @UseInterceptors(FilesInterceptor('files'))
  @ApiConsumes('multipart/form-data')
  getCreate(
    @Body() body: VehicleCreateDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.vehicleServices.createVehicle(body, files);
  }

  @Put('update/:id')
  @UseInterceptors(FilesInterceptor('files'))
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'id' })
  getUpdate(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: VehicleUpdateDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.vehicleServices.updateVehicle(body, files, id);
  }

  @Delete('delete/:id')
  @ApiParam({ name: 'id' })
  getDelete(@Param('id', ParseIntPipe) id: number) {
    return this.vehicleServices.deleteVehicle(id);
  }

  @Post('relation/:id')
  createRelationWith(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: VehicleRelationDto,
  ) {
    console.log(body);
    return this.vehicleServices.createRelationVehicle(id, body);
  }
}
