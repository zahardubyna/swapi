import { Module } from '@nestjs/common';
import { PeopleModule } from './people/people.module';
import { PlanetModule } from './planets/planet.module';

@Module({
  imports: [PeopleModule, PlanetModule],
})
export class EntityModule {}
