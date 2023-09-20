import { ApiProperty } from '@nestjs/swagger';

export class SpecieUpdateDto {
  @ApiProperty({ example: 'Human' })
  name: string;

  @ApiProperty({ example: 'mammal' })
  classification: string;

  @ApiProperty({ example: 'sentient' })
  designation: string;

  @ApiProperty({ example: '180' })
  average_height: string;

  @ApiProperty({ example: 'caucasian, black, asian, hispanic' })
  skin_colors: string;

  @ApiProperty({ example: 'blonde, brown, black, red' })
  hair_colors: string;

  @ApiProperty({ example: 'brown, blue, green, hazel, grey, amber' })
  eye_colors: string;

  @ApiProperty({ example: '120' })
  average_lifespan: string;

  @ApiProperty({ example: 'Galactic Basic' })
  language: string;

  @ApiProperty({ example: '2014-12-10T13:52:11.567000Z' })
  created: string;

  @ApiProperty({ example: '2014-12-20T21:36:42.136000Z' })
  edited: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    isArray: true,
  })
  private readonly files;
}
