import { PeopleEntity } from '../people/peopleEntity/people.entity';
import { PlanetEntity } from '../planets/planetEntity/planet.entity';
import { FilmEntity } from '../films/filmEntity/film.entity';
import { StarshipEntity } from '../starships/starshipsEntity/starship.entity';

export const EntityAll = {
  residents: PeopleEntity,
  characters: PeopleEntity,
  pilots: PeopleEntity,

  planets: PlanetEntity,
  homeworld: PlanetEntity,

  films: FilmEntity,

  starships: StarshipEntity,
};
