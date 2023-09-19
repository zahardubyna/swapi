import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ImagesEntity } from '../../../file.services/images/imageEntity/images.entity';
import { PeopleEntity } from '../../people/peopleEntity/people.entity';
import { PlanetEntity } from '../../planets/planetEntity/planet.entity';
import { StarshipEntity } from "../../starships/starshipsEntity/starship.entity";

@Entity({ name: 'film' })
export class FilmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  episode_id: string;

  @Column()
  opening_crawl: string;

  @Column()
  director: string;

  @Column()
  producer: string;

  @Column()
  release_date: string;

  @ManyToMany(() => PeopleEntity, (people) => people.films, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  characters: PeopleEntity[];

  @ManyToMany(() => PlanetEntity, (planet) => planet.films, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  planets: PlanetEntity[];

  // starships
  @ManyToMany(() => StarshipEntity, (starship) => starship.films, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  starships: StarshipEntity[];
  // vehicles
  // species

  @Column()
  created: string;

  @Column()
  edited: string;

  @ManyToMany(() => ImagesEntity, { cascade: true, eager: true })
  @JoinTable()
  images: ImagesEntity[];
}
