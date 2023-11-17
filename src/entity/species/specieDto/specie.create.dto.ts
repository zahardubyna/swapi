import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SpecieCreateDto {
  @ApiProperty({ example: 'Human' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'mammal' })
  @IsNotEmpty()
  classification: string;

  @ApiProperty({ example: 'sentient' })
  @IsNotEmpty()
  designation: string;

  @ApiProperty({ example: '180' })
  @IsNotEmpty()
  average_height: string;

  @ApiProperty({ example: 'caucasian, black, asian, hispanic' })
  @IsNotEmpty()
  skin_colors: string;

  @ApiProperty({ example: 'blonde, brown, black, red' })
  @IsNotEmpty()
  hair_colors: string;

  @ApiProperty({ example: 'brown, blue, green, hazel, grey, amber' })
  @IsNotEmpty()
  eye_colors: string;

  @ApiProperty({ example: '120' })
  @IsNotEmpty()
  average_lifespan: string;

  @ApiProperty({ example: 'Galactic Basic' })
  @IsNotEmpty()
  language: string;

  @ApiProperty({ example: '2014-12-10T13:52:11.567000Z' })
  @IsNotEmpty()
  created: string;

  @ApiProperty({ example: '2014-12-20T21:36:42.136000Z' })
  @IsNotEmpty()
  edited: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    isArray: true,
  })
  private readonly files;
}
