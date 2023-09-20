import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ImagesEntity } from '../../../file.services/images/imageEntity/images.entity';
import { PeopleEntity } from '../../people/peopleEntity/people.entity';
import { PlanetEntity } from '../../planets/planetEntity/planet.entity';
import { StarshipEntity } from '../../starships/starshipEntity/starship.entity';
import { SpecieEntity } from '../../species/specieEntity/specie.entity';
import { VehicleEntity } from '../../vehicles/vehicleEntity/vehicle.entity';

@Entity({ name: 'films' })
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

  @ManyToMany(() => StarshipEntity, (starship) => starship.films, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  starships: StarshipEntity[];

  @ManyToMany(() => VehicleEntity, (vehicle) => vehicle.films, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  vehicles: VehicleEntity[];

  @ManyToMany(() => SpecieEntity, (specie) => specie.films, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  species: SpecieEntity[];

  @Column()
  created: string;

  @Column()
  edited: string;

  @ManyToMany(() => ImagesEntity, { cascade: true, eager: true })
  @JoinTable()
  images: ImagesEntity[];
}
