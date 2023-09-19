import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ImagesEntity } from '../../../file.services/images/imageEntity/images.entity';
import { PlanetEntity } from '../../planets/planetEntity/planet.entity';
import { FilmEntity } from '../../films/filmEntity/film.entity';
import { StarshipEntity } from '../../starships/starshipsEntity/starship.entity';

@Entity({ name: 'people' })
export class PeopleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  height: string;

  @Column()
  mass: string;

  @Column()
  hair_color: string;

  @Column()
  skin_color: string;

  @Column()
  eye_color: string;

  @Column()
  birth_year: string;

  @Column()
  gender: string;

  @ManyToOne(() => PlanetEntity, (planet) => planet.residents, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  homeworld: PlanetEntity;

  @ManyToMany(() => FilmEntity, (film) => film.characters, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  films: FilmEntity[];

  // @Column()
  // species: string[];
  //
  // @Column()
  // vehicles: string[];
  //
  @ManyToMany(() => StarshipEntity, (starship) => starship.pilots, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  starships: StarshipEntity[];

  @Column()
  created: string;

  @Column()
  edited: string;

  @ManyToMany(() => ImagesEntity, { cascade: true, eager: true })
  @JoinTable()
  images: ImagesEntity[];
}
