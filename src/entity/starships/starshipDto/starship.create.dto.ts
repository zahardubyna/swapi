import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class StarshipCreateDto {
  @ApiProperty({ example: 'Death Star' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'DS-1 Orbital Battle Station' })
  @IsString()
  @IsNotEmpty()
  model: string;

  @ApiProperty({ example: 'Imperial Department of ...' })
  @IsString()
  @IsNotEmpty()
  manufacturer: string;

  @ApiProperty({ example: '1000000000000' })
  @IsString()
  @IsNotEmpty()
  cost_in_credits: string;

  @ApiProperty({ example: '120000' })
  @IsString()
  @IsNotEmpty()
  length: string;

  @ApiProperty({ example: 'n/a' })
  @IsString()
  @IsNotEmpty()
  max_atmosphering_speed: string;

  @ApiProperty({ example: '342,953' })
  @IsString()
  @IsNotEmpty()
  crew: string;

  @ApiProperty({ example: '843,342' })
  @IsString()
  @IsNotEmpty()
  passengers: string;

  @ApiProperty({ example: '1000000000000' })
  @IsString()
  @IsNotEmpty()
  cargo_capacity: string;

  @ApiProperty({ example: '3 years' })
  @IsString()
  @IsNotEmpty()
  consumables: string;

  @ApiProperty({ example: '4.0' })
  @IsString()
  @IsNotEmpty()
  hyperdrive_rating: string;

  @ApiProperty({ example: '10' })
  @IsString()
  @IsNotEmpty()
  MGLT: string;

  @ApiProperty({ example: 'Deep Space Mobile Battlestation' })
  @IsString()
  @IsNotEmpty()
  starship_class: string;

  @ApiProperty({ example: '2014-12-10T16:36:50.509000Z' })
  @IsString()
  @IsNotEmpty()
  created: string;

  @ApiProperty({ example: '2014-12-20T21:26:24.783000Z' })
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
