import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'people' })
export class PeopleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  height: string;

  @Column()
  mass: string;

  @Column()
  hair_color: string;

  @Column()
  skin_color: string;

  @Column()
  eye_color: string;

  @Column()
  birth_year: string;

  @Column()
  gender: string;

  // @Column()
  // homeworld: string;

  // @Column()
  // films: string[];
  //
  // @Column()
  // species: string[];
  //
  // @Column()
  // vehicles: string[];
  //
  // @Column()
  // starships: string[];

  @Column()
  created: string;

  @Column()
  edited: string;

  // @Column()
  // url: string;

  @Column()
  img_url: string;
}
