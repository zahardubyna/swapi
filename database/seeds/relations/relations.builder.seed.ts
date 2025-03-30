import axios from 'axios';
import seedDataSource from '@database/seed.config';
import { In, EntityManager } from 'typeorm';
import { FilmEntity } from '@entities/films/entity/film.entity';
import { PeopleEntity } from '@entities/people/entity/people.entity';
import { PlanetEntity } from '@entities/planets/entity/planet.entity';
import { SpecieEntity } from '@entities/species/entity/specie.entity';
import { StarshipEntity } from '@entities/starships/entity/starship.entity';
import { VehicleEntity } from '@entities/vehicles/entity/vehicle.entity';
import { plainToInstance } from 'class-transformer';

const starts: number = Date.now();

async function FilmsRelationSeed(manager: EntityManager): Promise<void> {
  async function runner(url: string): Promise<void> {
      const response = await axios.get(url).then((response) => response.data);

      for (const film of response.results) {
        const updated = await manager.findOne<FilmEntity>(FilmEntity, {where: {id: +film['url'].split('/')[5]}})
        
        updated.characters = await manager.find<PeopleEntity>(PeopleEntity, {where: {id: In((film.characters as unknown as string[]).map(url => +url.split('/')[5]))}})
        updated.planets = await manager.find<PlanetEntity>(PlanetEntity, {where: {id: In((film.planets as unknown as string[]).map(url => +url.split('/')[5]))}})
        updated.species = await manager.find<SpecieEntity>(SpecieEntity, {where: {id: In((film.species as unknown as string[]).map(url => +url.split('/')[5]))}})
        updated.starships = await manager.find<StarshipEntity>(StarshipEntity, {where: {id: In((film.starships as unknown as string[]).map(url => +url.split('/')[5]))}})
        updated.vehicles = await manager.find<VehicleEntity>(VehicleEntity, {where: {id: In((film.vehicles as unknown as string[]).map(url => +url.split('/')[5]))}})

        await manager.save(FilmEntity, plainToInstance(FilmEntity, updated));
      }

      if (response.next) {
        await runner(response.next);
      }
  }

  const url = 'https://swapi.dev/api/films/?page=1';
  await runner(url);
  console.log(`\x1b[32m✔\x1b[0m Builder FilmsRelationSeed executed`);
}

async function PeopleRelationSeed(manager: EntityManager): Promise<void> {
  async function runner(url: string): Promise<void> {
      const response = await axios.get(url).then((response) => response.data);

      for (const person of response.results) {
        const updated = await manager.findOne<PeopleEntity>(PeopleEntity, {where: {id: +person['url'].split('/')[5]}})

        !!person.homeworld ?
          updated.homeworld = await manager.findOne<PlanetEntity>(PlanetEntity, {where: {id: +((person.homeworld as unknown as string).split('/')[5])}}) : 0;
        updated.films = await manager.find<FilmEntity>(FilmEntity, {where: {id: In((person.films as unknown as string[]).map(url => +url.split('/')[5]))}})
        updated.species = await manager.find<SpecieEntity>(SpecieEntity, {where: {id: In((person.species as unknown as string[]).map(url => +url.split('/')[5]))}})
        updated.vehicles = await manager.find<VehicleEntity>(VehicleEntity, {where: {id: In((person.vehicles as unknown as string[]).map(url => +url.split('/')[5]))}})
        updated.starships = await manager.find<StarshipEntity>(StarshipEntity, {where: {id: In((person.starships as unknown as string[]).map(url => +url.split('/')[5]))}})

        await manager.save(PeopleEntity, plainToInstance(PeopleEntity, updated));
      }

      if (response.next) {
        await runner(response.next);
      }
  }

  const url = 'https://swapi.dev/api/people/?page=1';
  await runner(url);
  console.log(`\x1b[32m✔\x1b[0m Builder PeopleRelationSeed executed`);
}

async function PlanetRelationSeed(manager: EntityManager): Promise<void> {
  async function runner(url: string): Promise<void> {
      const response = await axios.get(url).then((response) => response.data);

      for (const planet of response.results) {
        const updated = await manager.findOne<PlanetEntity>(PlanetEntity, {where: {id: +planet['url'].split('/')[5]}})

        updated.residents = await manager.find<PeopleEntity>(PeopleEntity, {where: {id: In((planet.residents as unknown as string[]).map(url => +url.split('/')[5]))}})
        updated.films =  await manager.find<FilmEntity>(FilmEntity, {where: {id: In((planet.films as unknown as string[]).map(url => +url.split('/')[5]))}})

        await manager.save(PlanetEntity, plainToInstance(PlanetEntity, updated));

      }

      if (response.next) {
        await runner(response.next);
      }
  }

  const url = 'https://swapi.dev/api/planets/?page=1';
  await runner(url);
  console.log(`\x1b[32m✔\x1b[0m Builder PlanetsRelationSeed executed`);
}

async function SpeciesRelationSeed(manager: EntityManager): Promise<void> {
  async function runner(url: string): Promise<void> {
      const response = await axios.get(url).then((response) => response.data);

      for (const specie of response.results) {
        const updated = await manager.findOne<SpecieEntity>(SpecieEntity, {where: {id: +specie['url'].split('/')[5]}})

        updated.people = await manager.find<PeopleEntity>(PeopleEntity, {where: {id: In((specie.people as unknown as string[]).map(url => +url.split('/')[5]))}})
        updated.films =  await manager.find<FilmEntity>(FilmEntity, {where: {id: In((specie.films as unknown as string[]).map(url => +url.split('/')[5]))}})

        await manager.save(SpecieEntity, plainToInstance(SpecieEntity, updated));
      }

      if (response.next) {
        await runner(response.next);
      }
  }

  const url = 'https://swapi.dev/api/species/?page=1';
  await runner(url);
  console.log(`\x1b[32m✔\x1b[0m Builder SpeciesRelationSeed executed`);
}

async function StarshipsRelationSeed(manager: EntityManager): Promise<void> {
  async function runner(url: string): Promise<void> {
    const response = await axios.get(url).then((response) => response.data);

    for (const starship of response.results) {
      const updated = await manager.findOne<StarshipEntity>(StarshipEntity, {where: {id: +starship['url'].split('/')[5]}})

      updated.pilots = await manager.find<PeopleEntity>(PeopleEntity, {where: {id: In((starship.pilots as unknown as string[]).map(url => +url.split('/')[5]))}})
      updated.films =  await manager.find<FilmEntity>(FilmEntity, {where: {id: In((starship.films as unknown as string[]).map(url => +url.split('/')[5]))}})

      await manager.save(StarshipEntity, plainToInstance(StarshipEntity, updated));
    }

    if (response.next) {
      await runner(response.next);
    }
  }

  const url = 'https://swapi.dev/api/starships/?page=1';
  await runner(url);
  console.log(`\x1b[32m✔\x1b[0m Builder StarshipsRelationSeed executed`);
}

async function VehiclesRelationSeed(manager: EntityManager): Promise<void> {
  async function runner(url: string): Promise<void> {
      const response = await axios.get(url).then((response) => response.data);

      for (const vehicle of response.results) {
        const updated = await manager.findOne<VehicleEntity>(VehicleEntity, {where: {id: +vehicle['url'].split('/')[5]}})

        updated.pilots = await manager.find<PeopleEntity>(PeopleEntity, {where: {id: In((vehicle.pilots as unknown as string[]).map(url => +url.split('/')[5]))}})
        updated.films =  await manager.find<FilmEntity>(FilmEntity, {where: {id: In((vehicle.films as unknown as string[]).map(url => +url.split('/')[5]))}})

        await manager.save(VehicleEntity, plainToInstance(VehicleEntity, updated));
      }
      if (response.next) {
        await runner(response.next);
      }
  }

  const url = 'https://swapi.dev/api/vehicles/?page=1';
  await runner(url);
  console.log(`\x1b[32m✔\x1b[0m Builder VehiclesRelationSeed executed`);
}

async function main() {
  const tick: string = '\x1b[32m✔\x1b[0m'

  try {
    await seedDataSource.initialize();
    console.log(`${tick} Database loaded`);

    const queryRunner = seedDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const manager = queryRunner.manager;

    try {
      console.log(`\x1b[34mℹ\x1b[0m Executing seeders...`);

      await FilmsRelationSeed(manager);
      await PeopleRelationSeed(manager);
      await PlanetRelationSeed(manager);
      await SpeciesRelationSeed(manager);
      await StarshipsRelationSeed(manager);
      await VehiclesRelationSeed(manager);

      await queryRunner.commitTransaction();

      console.log(`${tick} Finished building`);

    } catch (error) {

      console.error("Error during seeding, rolling back transaction:", error);
      await queryRunner.rollbackTransaction();

    } finally {
      await queryRunner.release();
    }

  } catch (error) {

    console.error("Error during seeding process:", error);
    throw error;

  } finally {
    seedDataSource.isInitialized ? await seedDataSource.destroy() : null;
  }
}

main()
  .then(() => {
    console.log(`⏱️ Relation builder completed successfully in ${(Date.now() - starts) / 1000} seconds`);
    process.exit(0);
  })
  .catch((error) => {
    console.error("Process failed with error:", error);
    process.exit(1);
  });