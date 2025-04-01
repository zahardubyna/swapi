import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ImagesEntity } from '@file.services/images/entity/images.entity';
import { PeopleEntity } from '@entities/people/entity/people.entity';
import { FilmEntity } from '@entities/films/entity/film.entity';
import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

@Entity({ name: 'species' })
export class SpecieEntity extends BaseEntity {
  @IsNumber()
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @ApiProperty({ type: String })
  @Column()
  name: string;

  @IsString()
  @ApiProperty({ type: String })
  @Column()
  classification: string;

  @IsString()
  @ApiProperty({ type: String })
  @Column()
  designation: string;

  @IsString()
  @ApiProperty({ type: String })
  @Column()
  average_height: string;

  @IsString()
  @ApiProperty({ type: String })
  @Column()
  skin_colors: string;

  @IsString()
  @ApiProperty({ type: String })
  @Column()
  hair_colors: string;

  @IsString()
  @ApiProperty({ type: String })
  @Column()
  eye_colors: string;

  @IsString()
  @ApiProperty({ type: String })
  @Column()
  average_lifespan: string;

  @IsString()
  @ApiProperty({ type: String })
  @Column()
  language: string;

  @ManyToMany(() => PeopleEntity, (people) => people.species, {
    onDelete: 'CASCADE',
  })
  people?: PeopleEntity[];

  @ManyToMany(() => FilmEntity, (film) => film.species, {
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
  @JoinTable({ name: 'species_images' })
  images?: ImagesEntity[];
}
