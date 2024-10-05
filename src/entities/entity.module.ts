import { Module } from '@nestjs/common';
import { PeopleModule } from './people/people.module';
import { PlanetModule } from './planets/planet.module';
import { FilmModule } from './films/film.module';
import { StarshipModule } from './starships/starship.module';
import { SpecieModule } from './species/specie.module';
import { VehicleModule } from './vehicles/vehicle.module';
import { ConfigModule } from '@nestjs/config';
import { CaslModule } from '@casl/casl.module';
import { permissions } from './entity.permissions';

@Module({
  imports: [
    FilmModule,
    PeopleModule,
    PlanetModule,
    SpecieModule,
    StarshipModule,
    VehicleModule,
    ConfigModule,
    CaslModule.forFeature({ permissions })
  ],
})
export class EntityModule {}
