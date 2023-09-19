import { ApiProperty } from '@nestjs/swagger';

export class PeopleCreateDto {
  @ApiProperty({ example: 'Luke Skywalker' })
  name: string;

  @ApiProperty({ example: '172' })
  height: string;

  @ApiProperty({ example: '77' })
  mass: string;

  @ApiProperty({ example: 'blond' })
  hair_color: string;

  @ApiProperty({ example: 'fair' })
  skin_color: string;

  @ApiProperty({ example: 'blue' })
  eye_color: string;

  @ApiProperty({ example: '19BBY' })
  birth_year: string;

  @ApiProperty({ example: 'male' })
  gender: string;

  // @ApiProperty()
  // homeworld: string;

  // @Column()
  // films: string[];
  //
  // @Column()
  // species: string[];
  //
  // @Column()
  // vehicles: string[];
  //
  // @Column()
  // starships: string[];

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
