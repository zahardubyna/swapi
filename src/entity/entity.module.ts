import { Module } from '@nestjs/common';
import { PeopleModule } from './people/people.module';
import { PlanetModule } from './planets/planet.module';
import { FilmModule } from './films/film.module';
import { StarshipModule } from './starships/starship.module';

@Module({
  imports: [PeopleModule, PlanetModule, FilmModule, StarshipModule],
})
export class EntityModule {}
