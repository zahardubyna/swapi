import { PeopleEntity } from '@entities/people/peopleEntity/people.entity';
import { PlanetEntity } from '@entities/planets/planetEntity/planet.entity';
import { FilmEntity } from '@entities/films/filmEntity/film.entity';
import { StarshipEntity } from '@entities/starships/starshipEntity/starship.entity';
import { SpecieEntity } from '@entities/species/specieEntity/specie.entity';
import { VehicleEntity } from '@entities/vehicles/vehicleEntity/vehicle.entity';

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

export const entities: {
  people: 'people';

  films: 'films';

  planets: 'planets';

  species: 'species';

  starships: 'starships';

  vehicles: 'vehicles';
} = {
  people: 'people',

  films: 'films',

  planets: 'planets',

  species: 'species',

  starships: 'starships',

  vehicles: 'vehicles',
};
