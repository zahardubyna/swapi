import axios from 'axios';
import { DataSource } from 'typeorm';
import { Seeder } from '@jorgebodega/typeorm-seeding';

import { StarshipEntity } from '@entities/starships/entity/starship.entity';

export default class StarshipsSeed extends Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    async function runner(url: string): Promise<undefined> {
      const response = await axios.get(url).then((response) => response.data);

      const starships = response.results.map((starship: StarshipEntity) => {
        return {
          id: +starship['url'].split('/')[5],
          name: starship.name,
          model: starship.model,
          manufacturer: starship.manufacturer,
          cost_in_credits: starship.cost_in_credits,
          length: starship.length,
          max_atmosphering_speed: starship.max_atmosphering_speed,
          crew: starship.crew,
          passengers: starship.passengers,
          cargo_capacity: starship.cargo_capacity,
          consumables: starship.consumables,
          hyperdrive_rating: starship.hyperdrive_rating,
          MGLT: starship.MGLT,
          starship_class: starship.starship_class,
          created: starship.created,
          edited: starship.edited
        };
      });

      await dataSource
        .createQueryBuilder()
        .insert()
        .into(StarshipEntity)
        .values(starships)
        .execute();

      if (response.next) {
        return runner(response.next);
      }
    }
    const url = 'https://swapi.dev/api/starships/?page=1';
    return runner(url);
  }
}
