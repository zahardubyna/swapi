import axios from 'axios';
import seedDataSource from '@database/seed.config';
import { In } from 'typeorm';
import { FilmEntity } from '@entities/films/entity/film.entity';
import { PeopleEntity } from '@entities/people/entity/people.entity';
import { PlanetEntity } from '@entities/planets/entity/planet.entity';
import { SpecieEntity } from '@entities/species/entity/specie.entity';
import { StarshipEntity } from '@entities/starships/entity/starship.entity';
import { VehicleEntity } from '@entities/vehicles/entity/vehicle.entity';
import { plainToInstance } from 'class-transformer';

const starts: number = Date.now();

async function FilmsRelationSeed() {
  await seedDataSource.initialize();

  async function runner(url: string): Promise<void> {
    const response = await axios.get(url).then((response) => response.data);

    response.results.map(async (film: FilmEntity) => {
      const updated = await seedDataSource.createEntityManager().findOne<FilmEntity>(FilmEntity, {where: {id: +film['url'].split('/')[5]}})

      updated.characters = await seedDataSource.createEntityManager().find<PeopleEntity>(PeopleEntity, {where: {id: In((film.characters as unknown as string[]).map(url => +url.split('/')[5]))}})
      updated.planets = await seedDataSource.createEntityManager().find<PlanetEntity>(PlanetEntity, {where: {id: In((film.planets as unknown as string[]).map(url => +url.split('/')[5]))}})
      updated.species = await seedDataSource.createEntityManager().find<SpecieEntity>(SpecieEntity, {where: {id: In((film.species as unknown as string[]).map(url => +url.split('/')[5]))}})
      updated.starships = await seedDataSource.createEntityManager().find<StarshipEntity>(StarshipEntity, {where: {id: In((film.starships as unknown as string[]).map(url => +url.split('/')[5]))}})
      updated.vehicles = await seedDataSource.createEntityManager().find<VehicleEntity>(VehicleEntity, {where: {id: In((film.vehicles as unknown as string[]).map(url => +url.split('/')[5]))}})

      await seedDataSource.createEntityManager().save<FilmEntity>(plainToInstance(FilmEntity, updated));
    });

    if (response.next) {
      return runner(response.next);
    }
  }

  const url = 'https://swapi.dev/api/films/?page=1';
  return runner(url)
}


async function PeopleRelationSeed() {
  await seedDataSource.initialize();

  async function runner(url: string): Promise<void> {
    const response = await axios.get(url).then((response) => response.data);

    await response.results.map(async (person: PeopleEntity) => {
      const updated = await seedDataSource.createEntityManager().findOne<PeopleEntity>(PeopleEntity, {where: {id: +person['url'].split('/')[5]}})

      !!person.homeworld ?
      updated.homeworld = await seedDataSource.createEntityManager().findOne<PlanetEntity>(PlanetEntity, {where: {id: +((person.homeworld as unknown as string).split('/')[5])}}) : 0;
      updated.films = await seedDataSource.createEntityManager().find<FilmEntity>(FilmEntity, {where: {id: In((person.films as unknown as string[]).map(url => +url.split('/')[5]))}})
      updated.species = await seedDataSource.createEntityManager().find<SpecieEntity>(SpecieEntity, {where: {id: In((person.species as unknown as string[]).map(url => +url.split('/')[5]))}})
      updated.vehicles = await seedDataSource.createEntityManager().find<VehicleEntity>(VehicleEntity, {where: {id: In((person.vehicles as unknown as string[]).map(url => +url.split('/')[5]))}})
      updated.starships = await seedDataSource.createEntityManager().find<StarshipEntity>(StarshipEntity, {where: {id: In((person.starships as unknown as string[]).map(url => +url.split('/')[5]))}})

      await seedDataSource.createEntityManager().save<PeopleEntity>(plainToInstance(PeopleEntity, updated));
    });

    if (response.next) {
      return runner(response.next);
    }
  }

  const url = 'https://swapi.dev/api/people/?page=1';
  return runner(url)
}

async function PlanetRelationSeed() {
  await seedDataSource.initialize();

  async function runner(url: string): Promise<void> {
    const response = await axios.get(url).then((response) => response.data);

    await response.results.map(async (planet: PlanetEntity) => {
      const updated = await seedDataSource.createEntityManager().findOne<PlanetEntity>(PlanetEntity, {where: {id: +planet['url'].split('/')[5]}})

      updated.residents = await seedDataSource.createEntityManager().find<PeopleEntity>(PeopleEntity, {where: {id: In((planet.residents as unknown as string[]).map(url => +url.split('/')[5]))}})
      updated.films =  await seedDataSource.createEntityManager().find<FilmEntity>(FilmEntity, {where: {id: In((planet.films as unknown as string[]).map(url => +url.split('/')[5]))}})

      await seedDataSource.createEntityManager().save<PlanetEntity>(plainToInstance(PlanetEntity, updated));
    });

    if (response.next) {
      return runner(response.next);
    }
  }

  const url = 'https://swapi.dev/api/planets/?page=1';
  return runner(url)
}

async function SpeciesRelationSeed() {
  await seedDataSource.initialize();

  async function runner(url: string): Promise<void> {
    const response = await axios.get(url).then((response) => response.data);

    await response.results.map(async (specie: SpecieEntity) => {
      const updated = await seedDataSource.createEntityManager().findOne<SpecieEntity>(SpecieEntity, {where: {id: +specie['url'].split('/')[5]}})

      updated.people = await seedDataSource.createEntityManager().find<PeopleEntity>(PeopleEntity, {where: {id: In((specie.people as unknown as string[]).map(url => +url.split('/')[5]))}})
      updated.films =  await seedDataSource.createEntityManager().find<FilmEntity>(FilmEntity, {where: {id: In((specie.films as unknown as string[]).map(url => +url.split('/')[5]))}})

      await seedDataSource.createEntityManager().save<SpecieEntity>(plainToInstance(SpecieEntity, updated));
    });

    if (response.next) {
      return runner(response.next);
    }
  }

  const url = 'https://swapi.dev/api/species/?page=1';
  return runner(url)
}

async function StarshipsRelationSeed() {
  await seedDataSource.initialize();

  async function runner(url: string): Promise<void> {
    const response = await axios.get(url).then((response) => response.data);

    await response.results.map(async (starship: StarshipEntity) => {
      const updated = await seedDataSource.createEntityManager().findOne<StarshipEntity>(StarshipEntity, {where: {id: +starship['url'].split('/')[5]}})

      updated.pilots = await seedDataSource.createEntityManager().find<PeopleEntity>(PeopleEntity, {where: {id: In((starship.pilots as unknown as string[]).map(url => +url.split('/')[5]))}})
      updated.films =  await seedDataSource.createEntityManager().find<FilmEntity>(FilmEntity, {where: {id: In((starship.films as unknown as string[]).map(url => +url.split('/')[5]))}})

      await seedDataSource.createEntityManager().save<StarshipEntity>(plainToInstance(StarshipEntity, updated));
    });

    if (response.next) {
      return runner(response.next);
    }
  }

  const url = 'https://swapi.dev/api/starships/?page=1';
  return runner(url)
}

async function VehiclesRelationSeed() {
  await seedDataSource.initialize();

  async function runner(url: string): Promise<void> {
    const response = await axios.get(url).then((response) => response.data);

    await response.results.map(async (vehicle: VehicleEntity) => {
      const updated = await seedDataSource.createEntityManager().findOne<VehicleEntity>(VehicleEntity, {where: {id: +vehicle['url'].split('/')[5]}})

      updated.pilots = await seedDataSource.createEntityManager().find<PeopleEntity>(PeopleEntity, {where: {id: In((vehicle.pilots as unknown as string[]).map(url => +url.split('/')[5]))}})
      updated.films =  await seedDataSource.createEntityManager().find<FilmEntity>(FilmEntity, {where: {id: In((vehicle.films as unknown as string[]).map(url => +url.split('/')[5]))}})

      await seedDataSource.createEntityManager().save<VehicleEntity>(plainToInstance(VehicleEntity, updated));
    });

    if (response.next) {
      return runner(response.next);
    }
  }

  const url = 'https://swapi.dev/api/vehicles/?page=1';
  return runner(url)
}

FilmsRelationSeed().catch((err) => console.error('Seeder FilmsRelationSeed failed:', err)).finally(() => {console.log("\x1b[32m✔\x1b[0m Seeder FilmsRelationSeed executed")});
PeopleRelationSeed().catch((err) => console.error('Seeder PeopleRelationSeed failed:', err)).finally(() => {console.log("\x1b[32m✔\x1b[0m Seeder PeopleRelationSeed executed")});
PlanetRelationSeed().catch((err) => console.error('Seeder PlanetRelationSeed failed:', err)).finally(() => {console.log("\x1b[32m✔\x1b[0m Seeder PlanetRelationSeed executed")});
SpeciesRelationSeed().catch((err) => console.error('Seeder SpeciesRelationSeed failed:', err)).finally(() => {console.log("\x1b[32m✔\x1b[0m Seeder SpeciesRelationSeed executed")});
StarshipsRelationSeed().catch((err) => console.error('Seeder StarshipsRelationSeed failed:', err)).finally(() => {console.log("\x1b[32m✔\x1b[0m Seeder StarshipsRelationSeed executed")});
VehiclesRelationSeed().catch((err) => console.error('Seeder VehiclesRelationSeed failed:', err)).finally(() => {console.log("\x1b[32m✔\x1b[0m Seeder VehiclesRelationSeed executed")});
