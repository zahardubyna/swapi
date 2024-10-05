import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ImagesEntity } from '@file.services/images/imageEntity/images.entity';
import { PeopleEntity } from '../../people/peopleEntity/people.entity';
import { FilmEntity } from '../../films/filmEntity/film.entity';
import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


@Entity({ name: 'starships' })
export class StarshipEntity {
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
  model: string;

  @IsString()
  @ApiProperty({ type: String })
  @Column()
  manufacturer: string;

  @IsString()
  @ApiProperty({ type: String })
  @Column()
  cost_in_credits: string;

  @IsString()
  @ApiProperty({ type: String })
  @Column()
  length: string;

  @IsString()
  @ApiProperty({ type: String })
  @Column()
  max_atmosphering_speed: string;

  @IsString()
  @ApiProperty({ type: String })
  @Column()
  crew: string;

  @IsString()
  @ApiProperty({ type: String })
  @Column()
  passengers: string;

  @IsString()
  @ApiProperty({ type: String })
  @Column()
  cargo_capacity: string;

  @IsString()
  @ApiProperty({ type: String })
  @Column()
  consumables: string;

  @IsString()
  @ApiProperty({ type: String })
  @Column()
  hyperdrive_rating: string;

  @IsString()
  @ApiProperty({ type: String })
  @Column()
  MGLT: string;

  @IsString()
  @ApiProperty({ type: String })
  @Column()
  starship_class: string;

  @ManyToMany(() => PeopleEntity, (people) => people.starships, {
    onDelete: 'CASCADE',
  })
  pilots: PeopleEntity[];

  @ManyToMany(() => FilmEntity, (film) => film.starships, {
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
