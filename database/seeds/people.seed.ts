import axios from 'axios';
import { DataSource } from 'typeorm';
import { Seeder } from '@jorgebodega/typeorm-seeding';

import { PeopleEntity } from '@entities/people/entity/people.entity';

export default class PeopleSeed extends Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    async function runner(url: string): Promise<undefined> {
      const response = await axios.get(url).then((response) => response.data);

      const people = response.results.map((person: PeopleEntity) => {
        return {
          id: +person['url'].split('/')[5],
          name: person.name,
          height: person.height,
          mass: person.mass,
          hair_color: person.hair_color,
          skin_color: person.skin_color,
          eye_color: person.eye_color,
          birth_year: person.birth_year,
          gender: person.gender,
          created: person.created,
          edited: person.edited
        };
      });

      await dataSource
        .createQueryBuilder()
        .insert()
        .into(PeopleEntity)
        .values(people)
        .execute();

      if (response.next) {
        return runner(response.next);
      }
    }
    const url = 'https://swapi.dev/api/people/?page=1';
    return runner(url);
  }
}
