import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { VehicleEntity } from "./vehicleEntity/vehicle.entity";
import { FileImagesService } from '../../file.services/images/images.service';
import { VehicleCreateDto } from "./vehicleDto/vehicle.create.dto";
import { VehicleUpdateDto } from "./vehicleDto/vehicle.update.dto";
import { VehicleRelationDto } from "./vehicleDto/vehicle.relation.dto";
import { createRelation } from '../relation/create.relation';
import { StarshipRelationDto } from "../starships/starshipDto/starship.relation.dto";
import { StarshipEntity } from "../starships/starshipEntity/starship.entity";

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(VehicleEntity)
    private readonly vehiclesRepository: Repository<VehicleEntity>,
    private fileImagesService: FileImagesService,
  ) {}

  async getVehicles(skip, limit) {
    return this.vehiclesRepository.find({ skip: skip, take: limit });
  }

  async createVehicle(
    vehicleCreateDto: VehicleCreateDto,
    files: Express.Multer.File[],
  ) {
    const newVehicles = plainToInstance(VehicleEntity, vehicleCreateDto);
    newVehicles.images = await this.fileImagesService.appendFiles(files);
    return this.vehiclesRepository.save(newVehicles);
  }

  async updateVehicle(
    vehicleUpdateDto: VehicleUpdateDto,
    files: Express.Multer.File[],
    id: number,
  ) {
    const updatedVehicles = await this.vehiclesRepository.findOneBy({ id });
    const newVehicles = plainToInstance(VehicleEntity, vehicleUpdateDto);
    await this.fileImagesService.deleteFiles(updatedVehicles.images);
    newVehicles.images = await this.fileImagesService.appendFiles(files);
    return this.vehiclesRepository.save({ ...updatedVehicles, ...newVehicles });
  }

  async deleteVehicle(id: number) {
    const deletedVehicles = await this.vehiclesRepository.findOneBy({ id });
    const deletedInfo = await this.vehiclesRepository.remove(deletedVehicles);
    await this.fileImagesService.deleteFiles(deletedInfo.images);
    return deletedInfo;
  }

  async createRelationVehicle(
    id: number,
    vehicleRelationDto: VehicleRelationDto,
  ) {
    await createRelation(id, vehicleRelationDto, VehicleEntity);
  }
}
