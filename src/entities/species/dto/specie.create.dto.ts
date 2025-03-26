import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SpecieCreateDto {
  @ApiProperty({ example: 'Human' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'mammal' })
  @IsString()
  @IsNotEmpty()
  classification: string;

  @ApiProperty({ example: 'sentient' })
  @IsString()
  @IsNotEmpty()
  designation: string;

  @ApiProperty({ example: '180' })
  @IsString()
  @IsNotEmpty()
  average_height: string;

  @ApiProperty({ example: 'caucasian, black, asian, hispanic' })
  @IsString()
  @IsNotEmpty()
  skin_colors: string;

  @ApiProperty({ example: 'blonde, brown, black, red' })
  @IsString()
  @IsNotEmpty()
  hair_colors: string;

  @ApiProperty({ example: 'brown, blue, green, hazel, grey, amber' })
  @IsString()
  @IsNotEmpty()
  eye_colors: string;

  @ApiProperty({ example: '120' })
  @IsString()
  @IsNotEmpty()
  average_lifespan: string;

  @ApiProperty({ example: 'Galactic Basic' })
  @IsString()
  @IsNotEmpty()
  language: string;

  @ApiProperty({ example: '2014-12-10T13:52:11.567000Z' })
  @IsString()
  @IsNotEmpty()
  created: string;

  @ApiProperty({ example: '2014-12-20T21:36:42.136000Z' })
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
