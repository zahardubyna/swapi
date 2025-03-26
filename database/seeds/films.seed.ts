import axios from 'axios';
import { DataSource } from 'typeorm';
import { Seeder } from '@jorgebodega/typeorm-seeding';

import { FilmEntity } from '@entities/films/entity/film.entity';

export default class FilmsSeeder extends Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    async function runner(url: string): Promise<void> {
      const response = await axios.get(url).then((response) => response.data);

      const films = response.results.map((film: FilmEntity) => {
        return {
          id: +film['url'].split('/')[5],
          title: film.title,
          episode_id: film.episode_id,
          opening_crawl: film.opening_crawl,
          director: film.director,
          producer: film.producer,
          release_date: film.release_date,
          created: film.created,
          edited: film.edited
        };
      });

      await dataSource
        .createQueryBuilder()
        .insert()
        .into(FilmEntity)
        .values(films)
        .execute();

      if (response.next) {
        return runner(response.next);
      }
    }

    const url = 'https://swapi.dev/api/films/?page=1';
    return runner(url);
  }
}