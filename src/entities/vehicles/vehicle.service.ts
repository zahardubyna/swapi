import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { VehicleEntity } from './vehicleEntity/vehicle.entity';
import { FileImagesService } from '@file.services/images/images.service';
import { VehicleCreateDto } from './vehicleDto/vehicle.create.dto';
import { VehicleUpdateDto } from './vehicleDto/vehicle.update.dto';
import { VehicleRelationDto } from './vehicleDto/vehicle.relation.dto';
import { createRelation } from '../../relation/create.relation';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(VehicleEntity)
    private readonly vehiclesRepository: Repository<VehicleEntity>,
    private fileImagesService: FileImagesService,
  ) {}

  async getFew(skip: number, limit: number) {
    return this.vehiclesRepository.find({ skip: skip, take: limit });
  }

  async getOne(id: number) {
    return this.vehiclesRepository.findOne({ where: { id } });
  }

  async create(
    vehicleCreateDto: VehicleCreateDto,
    files: Express.Multer.File[],
  ) {
    const vehicle = plainToInstance(VehicleEntity, vehicleCreateDto);
    vehicle.images = await this.fileImagesService.appendFiles(files);
    return this.vehiclesRepository.save(vehicle);
  }

  async update(
    vehicleUpdateDto: VehicleUpdateDto,
    files: Express.Multer.File[],
    id: number,
  ) {
    const vehicle = await this.vehiclesRepository.findOneBy({ id });
    const newVehicles = plainToInstance(VehicleEntity, vehicleUpdateDto);
    await this.fileImagesService.deleteFiles(vehicle.images);
    newVehicles.images = await this.fileImagesService.appendFiles(files);
    return this.vehiclesRepository.save({ ...vehicle, ...newVehicles });
  }

  async delete(id: number) {
    const vehicle = await this.vehiclesRepository.findOneBy({ id });
    const info = await this.vehiclesRepository.remove(vehicle);
    await this.fileImagesService.deleteFiles(info.images);
    return info;
  }

  async createRelationWith(id: number, vehicleRelationDto: VehicleRelationDto) {
    await createRelation(id, vehicleRelationDto, VehicleEntity);
  }
}
