import { Module } from '@nestjs/common';
import { PeopleModule } from './people/people.module';
import { PlanetModule } from './planets/planet.module';
import { FilmModule } from './films/film.module';
import { StarshipModule } from './starships/starship.module';
import { SpecieModule } from './species/specie.module';
import { VehiclesModule } from './vehicles/vehicles.module';

@Module({
  imports: [
    PeopleModule,
    PlanetModule,
    FilmModule,
    StarshipModule,
    SpecieModule,
    VehiclesModule,
  ],
})
export class EntityModule {}
