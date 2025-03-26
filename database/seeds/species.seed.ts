import axios from 'axios';
import { DataSource } from 'typeorm';
import { Seeder } from '@jorgebodega/typeorm-seeding';

import { SpecieEntity } from '@entities/species/entity/specie.entity';

export default class SpeciesSeed extends Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    async function runner(url: string): Promise<undefined> {
      const response = await axios.get(url).then((response) => response.data);

      const species = response.results.map((specie: SpecieEntity) => {
        return {
          id: +specie['url'].split('/')[5],
          name: specie.name,
          classification: specie.classification,
          designation: specie.designation,
          average_height: specie.average_height,
          skin_colors: specie.skin_colors,
          hair_colors: specie.hair_colors,
          eye_colors: specie.eye_colors,
          average_lifespan: specie.average_lifespan,
          language: specie.language,
          created: specie.created,
          edited: specie.edited
        };
      });

      await dataSource
        .createQueryBuilder()
        .insert()
        .into(SpecieEntity)
        .values(species)
        .execute();

      if (response.next) {
        return runner(response.next);
      }
    }
    const url = 'https://swapi.dev/api/species/?page=1';
    return runner(url);
  }
}
