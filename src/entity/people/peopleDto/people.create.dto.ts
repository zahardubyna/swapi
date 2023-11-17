import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class PeopleCreateDto {
  @ApiProperty({ example: 'Luke Skywalker' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '172' })
  @IsNotEmpty()
  height: string;

  @ApiProperty({ example: '77' })
  @IsNotEmpty()
  mass: string;

  @ApiProperty({ example: 'blond' })
  @IsNotEmpty()
  hair_color: string;

  @ApiProperty({ example: 'fair' })
  @IsNotEmpty()
  skin_color: string;

  @ApiProperty({ example: 'blue' })
  @IsNotEmpty()
  eye_color: string;

  @ApiProperty({ example: '19BBY' })
  @IsNotEmpty()
  birth_year: string;

  @ApiProperty({ example: 'male' })
  @IsNotEmpty()
  gender: string;

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
