import {
  BaseEntity,
  Column, CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';
import { ImagesEntity } from '@file.services/images/entity/images.entity';
import { PeopleEntity } from '@entities/people/entity/people.entity';
import { PlanetEntity } from '@entities/planets/entity/planet.entity';
import { StarshipEntity } from '@entities/starships/entity/starship.entity';
import { SpecieEntity } from '@entities/species/entity/specie.entity';
import { VehicleEntity } from '@entities/vehicles/entity/vehicle.entity';
import { IsDate, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

@Entity({ name: 'films' })
export class FilmEntity extends BaseEntity {
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
  characters?: PeopleEntity[];

  @ManyToMany(() => PlanetEntity, (planet) => planet.films, {
    onDelete: 'CASCADE',
  })
  @JoinTable({ name: 'films_planets' })
  planets?: PlanetEntity[];

  @ManyToMany(() => StarshipEntity, (starship) => starship.films, {
    onDelete: 'CASCADE',
  })
  @JoinTable({ name: 'films_starships' })
  starships?: StarshipEntity[];

  @ManyToMany(() => VehicleEntity, (vehicle) => vehicle.films, {
    onDelete: 'CASCADE',
  })
  @JoinTable({ name: 'films_vehicles' })
  vehicles?: VehicleEntity[];

  @ManyToMany(() => SpecieEntity, (specie) => specie.films, {
    onDelete: 'CASCADE',
  })
  @JoinTable({ name: 'films_species' })
  species?: SpecieEntity[];

  @Exclude()
  @CreateDateColumn({ type: 'timestamp' })
  created: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamp' })
  edited: Date;

  @ManyToMany(() => ImagesEntity, { cascade: true, eager: true })
  @JoinTable({ name: 'films_images' })
  images?: ImagesEntity[];
}
