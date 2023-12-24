import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class VehicleCreateDto {
  @ApiProperty({ example: 'Sand Crawler' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Digger Crawler' })
  @IsString()
  @IsNotEmpty()
  model: string;

  @ApiProperty({ example: 'Corellia Mining Corporation' })
  @IsString()
  @IsNotEmpty()
  manufacturer: string;

  @ApiProperty({ example: '150000' })
  @IsString()
  @IsNotEmpty()
  cost_in_credits: string;

  @ApiProperty({ example: '36.8' })
  @IsString()
  @IsNotEmpty()
  length: string;

  @ApiProperty({ example: '30' })
  @IsString()
  @IsNotEmpty()
  max_atmosphering_speed: string;

  @ApiProperty({ example: '46' })
  @IsString()
  @IsNotEmpty()
  crew: string;

  @ApiProperty({ example: '30' })
  @IsString()
  @IsNotEmpty()
  passengers: string;

  @ApiProperty({ example: '50000' })
  @IsString()
  @IsNotEmpty()
  cargo_capacity: string;

  @ApiProperty({ example: '2 months' })
  @IsString()
  @IsNotEmpty()
  consumables: string;

  @ApiProperty({ example: 'wheeled' })
  @IsString()
  @IsNotEmpty()
  vehicle_class: string;

  @ApiProperty({ example: '2014-12-10T15:36:25.724000Z' })
  @IsString()
  @IsNotEmpty()
  created: string;

  @ApiProperty({ example: '2014-12-20T21:30:21.661000Z' })
  @IsString()
  @IsNotEmpty()
  edited: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    isArray: true,
  })
  private readonly files;
}
