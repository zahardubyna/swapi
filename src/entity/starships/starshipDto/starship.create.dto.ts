import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class StarshipCreateDto {
  @ApiProperty({ example: 'Death Star' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'DS-1 Orbital Battle Station' })
  @IsNotEmpty()
  model: string;

  @ApiProperty({ example: 'Imperial Department of ...' })
  @IsNotEmpty()
  manufacturer: string;

  @ApiProperty({ example: '1000000000000' })
  @IsNotEmpty()
  cost_in_credits: string;

  @ApiProperty({ example: '120000' })
  @IsNotEmpty()
  length: string;

  @ApiProperty({ example: 'n/a' })
  @IsNotEmpty()
  max_atmosphering_speed: string;

  @ApiProperty({ example: '342,953' })
  @IsNotEmpty()
  crew: string;

  @ApiProperty({ example: '843,342' })
  @IsNotEmpty()
  passengers: string;

  @ApiProperty({ example: '1000000000000' })
  @IsNotEmpty()
  cargo_capacity: string;

  @ApiProperty({ example: '3 years' })
  @IsNotEmpty()
  consumables: string;

  @ApiProperty({ example: '4.0' })
  @IsNotEmpty()
  hyperdrive_rating: string;

  @ApiProperty({ example: '10' })
  @IsNotEmpty()
  MGLT: string;

  @ApiProperty({ example: 'Deep Space Mobile Battlestation' })
  @IsNotEmpty()
  starship_class: string;

  @ApiProperty({ example: '2014-12-10T16:36:50.509000Z' })
  @IsNotEmpty()
  @IsString()
  created: string;

  @ApiProperty({ example: '2014-12-20T21:26:24.783000Z' })
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
