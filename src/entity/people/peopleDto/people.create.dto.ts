import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class PeopleCreateDto {
  @ApiProperty({ example: 'Luke Skywalker' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '172' })
  @IsString()
  @IsNotEmpty()
  height: string;

  @ApiProperty({ example: '77' })
  @IsString()
  @IsNotEmpty()
  mass: string;

  @ApiProperty({ example: 'blond' })
  @IsString()
  @IsNotEmpty()
  hair_color: string;

  @ApiProperty({ example: 'fair' })
  @IsString()
  @IsNotEmpty()
  skin_color: string;

  @ApiProperty({ example: 'blue' })
  @IsString()
  @IsNotEmpty()
  eye_color: string;

  @ApiProperty({ example: '19BBY' })
  @IsString()
  @IsNotEmpty()
  birth_year: string;

  @ApiProperty({ example: 'male' })
  @IsString()
  @IsNotEmpty()
  gender: string;

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
