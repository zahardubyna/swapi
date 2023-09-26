import { PeopleEntity } from '../entity/people/peopleEntity/people.entity';
import { PlanetEntity } from '../entity/planets/planetEntity/planet.entity';
import { FilmEntity } from '../entity/films/filmEntity/film.entity';
import { StarshipEntity } from '../entity/starships/starshipEntity/starship.entity';
import { SpecieEntity } from '../entity/species/specieEntity/specie.entity';
import { VehicleEntity } from '../entity/vehicles/vehicleEntity/vehicle.entity';

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
