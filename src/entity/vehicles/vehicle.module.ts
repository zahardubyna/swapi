import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleEntity } from './vehicleEntity/vehicle.entity';
import { VehicleController } from './vehicle.controller';
import { VehicleService } from './vehicle.service';
import { FileImagesService } from '../../file.services/images/images.service';
import { FileService } from '../../file.services/file/file.service';
import { BucketService } from '../../file.services/bucket/bucket.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([VehicleEntity])],
  controllers: [VehicleController],
  providers: [
    VehicleService,
    FileImagesService,
    FileService,
    BucketService,
    ConfigService,
    JwtService,
  ],
})
export class VehicleModule {}
