import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesModule } from '@file.services/images/images.module';
import { CaslModule } from '@casl/casl.module';
import { VehicleEntity } from './vehicleEntity/vehicle.entity';
import { VehicleController } from './vehicle.controller';
import { VehicleService } from './vehicle.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([VehicleEntity]),
    ImagesModule,
    CaslModule,
  ],
  controllers: [VehicleController],
  providers: [VehicleService, ConfigService, JwtService],
})
export class VehicleModule {}
