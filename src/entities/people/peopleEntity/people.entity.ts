import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ImagesEntity } from '@file.services/images/imageEntity/images.entity';
import { PlanetEntity } from '../../planets/planetEntity/planet.entity';
import { FilmEntity } from '../../films/filmEntity/film.entity';
import { StarshipEntity } from '../../starships/starshipEntity/starship.entity';
import { SpecieEntity } from '../../species/specieEntity/specie.entity';
import { VehicleEntity } from '../../vehicles/vehicleEntity/vehicle.entity';
import { IsDate, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'people' })
export class PeopleEntity {

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
  })
  homeworld: PlanetEntity;

  
  @ManyToMany(() => FilmEntity, (film) => film.characters, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinTable()
  films: FilmEntity[];

  
  @ManyToMany(() => SpecieEntity, (specie) => specie.people, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinTable()
  species: SpecieEntity[];

  
  @ManyToMany(() => VehicleEntity, (vehicle) => vehicle.pilots, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinTable()
  vehicles: VehicleEntity[];

  
  @ManyToMany(() => StarshipEntity, (starship) => starship.pilots, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinTable()
  starships: StarshipEntity[];

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
