import { PartialType } from '@nestjs/swagger';
import { VehicleCreateDto } from './vehicle.create.dto';

export class VehicleUpdateDto extends PartialType(VehicleCreateDto) {}
