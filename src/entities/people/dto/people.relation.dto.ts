import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional } from 'class-validator';

export class PeopleRelationDto {
  @ApiProperty()
  @IsNumber({})
  homeworld: number;

  @ApiProperty({ type: 'number', isArray: true })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  starships: number[];

  @ApiProperty({ type: 'number', isArray: true })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  films: number[];

  @ApiProperty({ type: 'number', isArray: true })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  species: number[];

  @ApiProperty({ type: 'number', isArray: true })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  vehicles: number[];
}
