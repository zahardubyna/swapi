import axios from 'axios';
import { DataSource } from 'typeorm';
import { Seeder } from '@jorgebodega/typeorm-seeding';

import { PlanetEntity } from '@entities/planets/entity/planet.entity';
import { FilmEntity } from '@entities/films/entity/film.entity';

export default class PlanetsSeed extends Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    async function runner(url: string): Promise<undefined> {
      const response = await axios.get(url).then((response) => response.data);

      const planets = response.results.map((planet: PlanetEntity) => {
        return {
          id: +planet['url'].split('/')[5],
          name: planet.name,
          rotation_period: planet.rotation_period,
          orbital_period: planet.orbital_period,
          diameter: planet.diameter,
          climate: planet.climate,
          gravity: planet.gravity,
          terrain: planet.terrain,
          surface_water: planet.surface_water,
          population: planet.population,
          created: planet.created,
          edited: planet.edited
        };
      });

      await dataSource
        .createQueryBuilder()
        .insert()
        .into(PlanetEntity)
        .values(planets)
        .execute();

      if (response.next) {
        return runner(response.next);
      }
    }
    const url = 'https://swapi.dev/api/planets/?page=1';
    return runner(url);
  }
}
