import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class PlanetCreateDto {
  @ApiProperty({ example: 'Tatooine' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '23' })
  @IsString()
  @IsNotEmpty()
  rotation_period: string;

  @ApiProperty({ example: '304' })
  @IsString()
  @IsNotEmpty()
  orbital_period: string;

  @ApiProperty({ example: '10465' })
  @IsString()
  @IsNotEmpty()
  diameter: string;

  @ApiProperty({ example: 'arid' })
  @IsString()
  @IsNotEmpty()
  climate: string;

  @ApiProperty({ example: '1 standard' })
  @IsString()
  @IsNotEmpty()
  gravity: string;

  @ApiProperty({ example: 'desert' })
  @IsString()
  @IsNotEmpty()
  terrain: string;

  @ApiProperty({ example: '1' })
  @IsString()
  @IsNotEmpty()
  surface_water: string;

  @ApiProperty({ example: '200000' })
  @IsString()
  @IsNotEmpty()
  population: string;

  @ApiProperty({ example: '2014-12-09T13:50:51.644000Z' })
  @IsString()
  @IsNotEmpty()
  created: string;

  @ApiProperty({ example: '2014-12-20T21:17:56.891000Z' })
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
