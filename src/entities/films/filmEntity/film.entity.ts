import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ImagesEntity } from '@file.services/images/imageEntity/images.entity';
import { PeopleEntity } from '../../people/peopleEntity/people.entity';
import { PlanetEntity } from '../../planets/planetEntity/planet.entity';
import { StarshipEntity } from '../../starships/starshipEntity/starship.entity';
import { SpecieEntity } from '../../species/specieEntity/specie.entity';
import { VehicleEntity } from '../../vehicles/vehicleEntity/vehicle.entity';
import { IsDate, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'films' })
export class FilmEntity {
  @IsString()
  @ApiProperty({ type: Number })
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @ApiProperty({ type: String })
  @Column()
  title: string;

  @IsString()
  @ApiProperty({ type: String })
  @Column()
  episode_id: string;

  @IsString()
  @ApiProperty({ type: String })
  @Column({ type: 'longtext' })
  opening_crawl: string;

  @IsString()
  @ApiProperty({ type: String })
  @Column()
  director: string;

  @IsString()
  @ApiProperty({ type: String })
  @Column()
  producer: string;

  @IsString()
  @ApiProperty({ type: String })
  @Column()
  release_date: string;

  @ManyToMany(() => PeopleEntity, (people) => people.films, {
    onDelete: 'CASCADE',
  })
  characters: PeopleEntity[];

  @ManyToMany(() => PlanetEntity, (planet) => planet.films, {
    onDelete: 'CASCADE',
  })
  planets: PlanetEntity[];

  @ManyToMany(() => StarshipEntity, (starship) => starship.films, {
    onDelete: 'CASCADE',
  })
  starships: StarshipEntity[];

  @ManyToMany(() => VehicleEntity, (vehicle) => vehicle.films, {
    onDelete: 'CASCADE',
  })
  vehicles: VehicleEntity[];

  @ManyToMany(() => SpecieEntity, (specie) => specie.films, {
    onDelete: 'CASCADE',
  })
  species: SpecieEntity[];

  @IsDate()
  @ApiProperty({ type: Date })
  @Column()
  created: string;

  @IsDate()
  @ApiProperty({ type: Date })
  @Column()
  edited: string;

  @ManyToMany(() => ImagesEntity, { cascade: true, eager: true })
  @JoinTable()
  images: ImagesEntity[];
}
