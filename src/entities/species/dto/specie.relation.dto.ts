import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional } from 'class-validator';

export class SpecieRelationDto {
  @ApiProperty()
  @IsNumber({})
  homeworld: number;

  @ApiProperty({ type: 'number', isArray: true })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  people: number[];

  @ApiProperty({ type: 'number', isArray: true })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  films: number[];
}
