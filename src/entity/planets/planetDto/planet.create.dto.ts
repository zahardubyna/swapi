import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class PlanetCreateDto {
  @ApiProperty({ example: 'Tatooine' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '23' })
  @IsNotEmpty()
  rotation_period: string;

  @ApiProperty({ example: '304' })
  @IsNotEmpty()
  orbital_period: string;

  @ApiProperty({ example: '10465' })
  @IsNotEmpty()
  diameter: string;

  @ApiProperty({ example: 'arid' })
  @IsNotEmpty()
  climate: string;

  @ApiProperty({ example: '1 standard' })
  @IsNotEmpty()
  gravity: string;

  @ApiProperty({ example: 'desert' })
  @IsNotEmpty()
  terrain: string;

  @ApiProperty({ example: '1' })
  @IsNotEmpty()
  surface_water: string;

  @ApiProperty({ example: '200000' })
  @IsNotEmpty()
  population: string;

  @ApiProperty({ example: '2014-12-09T13:50:51.644000Z' })
  @IsNotEmpty()
  created: string;

  @ApiProperty({ example: '2014-12-20T21:17:56.891000Z' })
  @IsNotEmpty()
  edited: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    isArray: true,
  })
  private readonly files;
}
