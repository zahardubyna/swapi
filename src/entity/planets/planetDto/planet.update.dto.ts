import { ApiProperty } from '@nestjs/swagger';
import { IsString } from "class-validator";

export class PlanetUpdateDto {
  @ApiProperty({ example: 'Tatooine' })
  @IsString()
  name: string;

  @ApiProperty({ example: '23' })
  rotation_period: string;

  @ApiProperty({ example: '304' })
  orbital_period: string;

  @ApiProperty({ example: '10465' })
  diameter: string;

  @ApiProperty({ example: 'arid' })
  climate: string;

  @ApiProperty({ example: '1 standard' })
  gravity: string;

  @ApiProperty({ example: 'desert' })
  terrain: string;

  @ApiProperty({ example: '1' })
  surface_water: string;

  @ApiProperty({ example: '200000' })
  population: string;

  // @ApiProperty()
  // residents: string;

  // @ApiProperty()
  // films: string[];

  @ApiProperty({ example: '2014-12-09T13:50:51.644000Z' })
  created: string;

  @ApiProperty({ example: '2014-12-20T21:17:56.891000Z' })
  edited: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    isArray: true,
  })
  private readonly files;
}
