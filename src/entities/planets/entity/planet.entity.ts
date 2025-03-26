import {
  BaseEntity,
  Column, CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';
import { ImagesEntity } from '@file.services/images/entity/images.entity';
import { PeopleEntity } from '@entities/people/entity/people.entity';
import { FilmEntity } from '@entities/films/entity/film.entity';
import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

@Entity({ name: 'planets' })
export class PlanetEntity extends BaseEntity {
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

  @OneToMany(() => PeopleEntity, (people) => people.homeworld, {
    onDelete: 'CASCADE',
  })
  residents?: PeopleEntity[];

  @ManyToMany(() => FilmEntity, (film) => film.planets, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  films?: FilmEntity[];

  @Exclude()
  @CreateDateColumn({ type: 'timestamp' })
  created: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamp' })
  edited: Date;

  @ManyToMany(() => ImagesEntity, { cascade: true, eager: true })
  @JoinTable({ name: 'planets_images' })
  images?: ImagesEntity[];
}
