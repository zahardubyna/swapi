import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ImagesEntity } from '@file.services/images/imageEntity/images.entity';
import { PeopleEntity } from '../../people/peopleEntity/people.entity';
import { FilmEntity } from '../../films/filmEntity/film.entity';
import { PlanetEntity } from '../../planets/planetEntity/planet.entity';
import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'species' })
export class SpecieEntity {
  @IsNumber()
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @ApiProperty({ type: String })
  @Column()
  name: string;

  @IsString()
  @ApiProperty({ type: String })
  @Column()
  classification: string;

  @IsString()
  @ApiProperty({ type: String })
  @Column()
  designation: string;

  @IsString()
  @ApiProperty({ type: String })
  @Column()
  average_height: string;

  @IsString()
  @ApiProperty({ type: String })
  @Column()
  skin_colors: string;

  @IsString()
  @ApiProperty({ type: String })
  @Column()
  hair_colors: string;

  @IsString()
  @ApiProperty({ type: String })
  @Column()
  eye_colors: string;

  @IsString()
  @ApiProperty({ type: String })
  @Column()
  average_lifespan: string;

  @IsString()
  @ApiProperty({ type: String })
  @Column()
  language: string;

  @ManyToOne(() => PlanetEntity, {
    eager: true,
  })
  homeworld: PlanetEntity;

  @ManyToMany(() => PeopleEntity, (people) => people.species, {
    onDelete: 'CASCADE',
  })
  people: PeopleEntity[];

  @ManyToMany(() => FilmEntity, (film) => film.species, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinTable()
  films: FilmEntity[];

  @IsString()
  @ApiProperty({ type: String })
  @Column()
  created: string;

  @IsString()
  @ApiProperty({ type: String })
  @Column()
  edited: string;

  @ManyToMany(() => ImagesEntity, { cascade: true, eager: true })
  @JoinTable()
  images: ImagesEntity[];
}
