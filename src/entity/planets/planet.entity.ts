import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'planets' })
export class PlanetEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  rotation_period: string;

  @Column()
  orbital_period: string;

  @Column()
  diameter: string;

  @Column()
  climate: string;

  @Column()
  gravity: string;

  @Column()
  terrain: string;

  @Column()
  surface_water: string;

  @Column()
  population: string;

  // @Column()
  // residents: string[];

  // @Column()
  // films: string[];

  @Column()
  created: string;

  @Column()
  edited: string;

  // @Column()
  // url: string;
}
