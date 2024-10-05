import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ImagesEntity } from '@file.services/images/imageEntity/images.entity';
import { PeopleEntity } from '../../people/peopleEntity/people.entity';
import { FilmEntity } from '../../films/filmEntity/film.entity';
import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'planets' })
export class PlanetEntity {
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
  rotation_period: string;

  @IsString()
  @ApiProperty({ type: String })
  @Column()
  orbital_period: string;

  @IsString()
  @ApiProperty({ type: String })
  @Column()
  diameter: string;

  @IsString()
  @ApiProperty({ type: String })
  @Column()
  climate: string;

  @IsString()
  @ApiProperty({ type: String })
  @Column()
  gravity: string;

  @IsString()
  @ApiProperty({ type: String })
  @Column()
  terrain: string;

  @IsString()
  @ApiProperty({ type: String })
  @Column()
  surface_water: string;

  @IsString()
  @ApiProperty({ type: String })
  @Column()
  population: string;

  @OneToMany(() => PeopleEntity, (people) => people.homeworld)
  @JoinTable()
  residents: PeopleEntity[];

  @ManyToMany(() => FilmEntity, (film) => film.planets, {
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
