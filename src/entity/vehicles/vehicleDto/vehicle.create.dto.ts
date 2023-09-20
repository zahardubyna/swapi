import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class VehicleCreateDto {
  @ApiProperty({ example: 'Sand Crawler' })
  name: string;

  @ApiProperty({ example: 'Digger Crawler' })
  model: string;

  @ApiProperty({ example: 'Corellia Mining Corporation' })
  manufacturer: string;

  @ApiProperty({ example: '150000' })
  cost_in_credits: string;

  @ApiProperty({ example: '36.8' })
  length: string;

  @ApiProperty({ example: '30' })
  max_atmosphering_speed: string;

  @ApiProperty({ example: '46' })
  crew: string;

  @ApiProperty({ example: '30' })
  passengers: string;

  @ApiProperty({ example: '50000' })
  cargo_capacity: string;

  @ApiProperty({ example: '2 months' })
  consumables: string;

  @ApiProperty({ example: 'wheeled' })
  vehicle_class: string;

  @ApiProperty({ example: '2014-12-10T15:36:25.724000Z' })
  @IsString()
  created: string;

  @ApiProperty({ example: '2014-12-20T21:30:21.661000Z' })
  @IsString()
  edited: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    isArray: true,
  })
  private readonly files;
}
