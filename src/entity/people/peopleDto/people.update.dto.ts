import { ApiProperty } from '@nestjs/swagger';

export class PeopleUpdateDto {
  @ApiProperty({ example: 'updated name' })
  name: string;

  @ApiProperty({ example: 'updated height' })
  height: string;

  @ApiProperty({ example: 'updated mass' })
  mass: string;

  @ApiProperty({ example: 'updated hair_color' })
  hair_color: string;

  @ApiProperty({ example: 'updated skin_color' })
  skin_color: string;

  @ApiProperty({ example: 'updated eye_color' })
  eye_color: string;

  @ApiProperty({ example: 'updated birth_year' })
  birth_year: string;

  @ApiProperty({ example: 'updated gender' })
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

  @ApiProperty({ example: 'updated created_at' })
  created: string;

  @ApiProperty({ example: 'updated edited_at' })
  edited: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    isArray: true,
  })
  private readonly files;
}
