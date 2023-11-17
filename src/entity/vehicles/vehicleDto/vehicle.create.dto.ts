import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class VehicleCreateDto {
  @ApiProperty({ example: 'Sand Crawler' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Digger Crawler' })
  @IsNotEmpty()
  model: string;

  @ApiProperty({ example: 'Corellia Mining Corporation' })
  @IsNotEmpty()
  manufacturer: string;

  @ApiProperty({ example: '150000' })
  @IsNotEmpty()
  cost_in_credits: string;

  @ApiProperty({ example: '36.8' })
  @IsNotEmpty()
  length: string;

  @ApiProperty({ example: '30' })
  @IsNotEmpty()
  max_atmosphering_speed: string;

  @ApiProperty({ example: '46' })
  @IsNotEmpty()
  crew: string;

  @ApiProperty({ example: '30' })
  @IsNotEmpty()
  passengers: string;

  @ApiProperty({ example: '50000' })
  @IsNotEmpty()
  cargo_capacity: string;

  @ApiProperty({ example: '2 months' })
  @IsNotEmpty()
  consumables: string;

  @ApiProperty({ example: 'wheeled' })
  @IsNotEmpty()
  vehicle_class: string;

  @ApiProperty({ example: '2014-12-10T15:36:25.724000Z' })
  @IsNotEmpty()
  @IsString()
  created: string;

  @ApiProperty({ example: '2014-12-20T21:30:21.661000Z' })
  @IsNotEmpty()
  @IsString()
  edited: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    isArray: true,
  })
  private readonly files;
}
