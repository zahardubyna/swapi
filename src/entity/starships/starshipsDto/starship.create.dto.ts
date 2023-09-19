import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class StarshipCreateDto {
  @ApiProperty({ example: 'Death Star' })
  name: string;

  @ApiProperty({ example: 'DS-1 Orbital Battle Station' })
  model: string;

  @ApiProperty({ example: 'Imperial Department of ...' })
  manufacturer: string;

  @ApiProperty({ example: '1000000000000' })
  cost_in_credits: string;

  @ApiProperty({ example: '120000' })
  length: string;

  @ApiProperty({ example: 'n/a' })
  max_atmosphering_speed: string;

  @ApiProperty({ example: '342,953' })
  crew: string;

  @ApiProperty({ example: '843,342' })
  passengers: string;

  @ApiProperty({ example: '1000000000000' })
  cargo_capacity: string;

  @ApiProperty({ example: '3 years' })
  consumables: string;

  @ApiProperty({ example: '4.0' })
  hyperdrive_rating: string;

  @ApiProperty({ example: '10' })
  MGLT: string;

  @ApiProperty({ example: 'Deep Space Mobile Battlestation' })
  starship_class: string;

  @ApiProperty({ example: '2014-12-10T16:36:50.509000Z' })
  @IsString()
  created: string;

  @ApiProperty({ example: '2014-12-20T21:26:24.783000Z' })
  @IsString()
  edited: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    isArray: true,
  })
  private readonly files;
}
