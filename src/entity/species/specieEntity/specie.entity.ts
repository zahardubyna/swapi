import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ImagesEntity } from '../../../file.services/images/imageEntity/images.entity';
import { PeopleEntity } from '../../people/peopleEntity/people.entity';
import { FilmEntity } from '../../films/filmEntity/film.entity';
import { PlanetEntity } from '../../planets/planetEntity/planet.entity';

@Entity({ name: 'species' })
export class SpecieEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  classification: string;

  @Column()
  designation: string;

  @Column()
  average_height: string;

  @Column()
  skin_colors: string;

  @Column()
  hair_colors: string;

  @Column()
  eye_colors: string;

  @Column()
  average_lifespan: string;

  @Column()
  language: string;

  @ManyToOne(() => PlanetEntity, {
    eager: true,
  })
  @JoinTable()
  homeworld: PlanetEntity;

  @ManyToMany(() => PeopleEntity, (people) => people.species, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  people: PeopleEntity[];

  @ManyToMany(() => FilmEntity, (film) => film.species, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinTable()
  films: FilmEntity[];

  @Column()
  created: string;

  @Column()
  edited: string;

  @ManyToMany(() => ImagesEntity, { cascade: true, eager: true })
  @JoinTable()
  images: ImagesEntity[];
}
