import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ImagesEntity } from '@file.services/images/entity/images.entity';
import { PlanetEntity } from '@entities/planets/entity/planet.entity';
import { FilmEntity } from '@entities/films/entity/film.entity';
import { StarshipEntity } from '@entities/starships/entity/starship.entity';
import { SpecieEntity } from '@entities/species/entity/specie.entity';
import { VehicleEntity } from '@entities/vehicles/entity/vehicle.entity';
import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

@Entity({ name: 'people' })
export class PeopleEntity extends BaseEntity {
  @IsNumber()
  @ApiProperty({ type: Number })
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @ApiProperty({ type: String })
  @Column()
  name: string;

  @IsString()
  @ApiProperty({ type: String })
  @Column()
  height: string;

  @IsString()
  @ApiProperty({ type: String })
  @Column()
  mass: string;

  @IsString()
  @ApiProperty({ type: String })
  @Column()
  hair_color: string;

  @IsString()
  @ApiProperty({ type: String })
  @Column()
  skin_color: string;

  @IsString()
  @ApiProperty({ type: String })
  @Column()
  eye_color: string;

  @IsString()
  @ApiProperty({ type: String })
  @Column()
  birth_year: string;

  @IsString()
  @ApiProperty({ type: String })
  @Column()
  gender: string;

  @ManyToOne(() => PlanetEntity, (planet) => planet.residents, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  homeworld?: PlanetEntity;

  @ManyToMany(() => FilmEntity, (film) => film.characters, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinTable({ name: 'people_films' })
  films?: FilmEntity[];

  @ManyToMany(() => SpecieEntity, (specie) => specie.people, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinTable({ name: 'people_species' })
  species?: SpecieEntity[];

  @ManyToMany(() => VehicleEntity, (vehicle) => vehicle.pilots, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinTable({ name: 'people_vehicles' })
  vehicles?: VehicleEntity[];

  @ManyToMany(() => StarshipEntity, (starship) => starship.pilots, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinTable({ name: 'people_starships' })
  starships?: StarshipEntity[];

  @Exclude()
  @CreateDateColumn({ type: 'timestamp' })
  created: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamp' })
  edited: Date;

  @ManyToMany(() => ImagesEntity, { cascade: true, eager: true })
  @JoinTable({ name: 'people_images' })
  images?: ImagesEntity[];
}
