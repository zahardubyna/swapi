import { PeopleEntity } from '../people/peopleEntity/people.entity';
import { PlanetEntity } from '../planets/planetEntity/planet.entity';
import { FilmEntity } from '../films/filmEntity/film.entity';
import { StarshipEntity } from '../starships/starshipEntity/starship.entity';
import { SpecieEntity } from '../species/specieEntity/specie.entity';
import { VehicleEntity } from '../vehicles/vehicleEntity/vehicle.entity';

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
