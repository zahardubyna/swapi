import { PeopleEntity } from '@entities/people/entity/people.entity';
import { PlanetEntity } from '@entities/planets/entity/planet.entity';
import { FilmEntity } from '@entities/films/entity/film.entity';
import { StarshipEntity } from '@entities/starships/entity/starship.entity';
import { SpecieEntity } from '@entities/species/entity/specie.entity';
import { VehicleEntity } from '@entities/vehicles/entity/vehicle.entity';

export const EntityAll = {
  residents: PeopleEntity,
  characters: PeopleEntity,
  pilots: PeopleEntity,
  people: PeopleEntity,

  planets: PlanetEntity,
  homeworld: PlanetEntity,

  films: FilmEntity,

  starships: StarshipEntity,

  species: SpecieEntity,

  vehicles: VehicleEntity,
};

export const Entities = {
  people: PeopleEntity,
  planets: PlanetEntity,
  films: FilmEntity,
  starships: StarshipEntity,
  species: SpecieEntity,
  vehicles: VehicleEntity,
};
