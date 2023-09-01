import { ApiProperty } from '@nestjs/swagger';

export class PeopleCreateDto {
  @ApiProperty({ example: 'test' })
  name: string;

  @ApiProperty({ example: 'test' })
  height: string;

  @ApiProperty({ example: 'test' })
  mass: string;

  @ApiProperty({ example: 'test' })
  hair_color: string;

  @ApiProperty({ example: 'test' })
  skin_color: string;

  @ApiProperty({ example: 'test' })
  eye_color: string;

  @ApiProperty({ example: 'test' })
  birth_year: string;

  @ApiProperty({ example: 'test' })
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

  @ApiProperty({ example: 'test' })
  created: string;

  @ApiProperty({ example: 'test' })
  edited: string;

  // @ApiProperty()
  // url: string;
}
