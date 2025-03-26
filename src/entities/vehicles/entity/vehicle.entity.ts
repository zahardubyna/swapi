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
import { FilmEntity } from '@entities/films/entity/film.entity';
import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

@Entity({ name: 'vehicles' })
export class VehicleEntity extends BaseEntity {
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
  vehicle_class: string;

  @ManyToMany(() => PeopleEntity, (people) => people.vehicles, {
    onDelete: 'CASCADE',
  })
  pilots?: PeopleEntity[];

  @ManyToMany(() => FilmEntity, (film) => film.vehicles, {
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
  @JoinTable({ name: 'vehicles_images' })
  images?: ImagesEntity[];
}
