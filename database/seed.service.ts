import axios from 'axios';
import { entities, EntityAll } from '../src/relation/entity.all';
import { plainToInstance } from 'class-transformer';

export class SeedService {
  public starts: number = Date.now();

  public dataWithRelations = {
    films: [],
    people: [],
    planets: [],
    species: [],
    starships: [],
    vehicles: [],
  };
  public data = {
    films: [],
    people: [],
    planets: [],
    species: [],
    starships: [],
    vehicles: [],
  };
  public relations = [
    'homeworld',
    'films',
    'species',
    'vehicles',
    'starships',
    'characters',
    'planets',
    'starships',
    'vehicles',
    'species',
    'residents',
    'people',
    'pilots',
    'url',
  ];

  public async getData() {
    for (const essence in entities) {
      const swapiUrl: string = 'https://swapi.dev/api/';
      const entity: string = entities[essence];
      let url = swapiUrl + entity;
      for (; url; ) {
        const response = await axios.get(url);
        const { results, next } = response.data;

        this.dataWithRelations[entity] = [
          ...this.dataWithRelations[entity],
          ...results,
        ];
        this.data[entity] = [...this.data[entity], ...results];

        url = next;
      }

      await this.deleteRelationsInData(entity);
    }
    return this.data;
  }
  public async deleteRelationsInData(entityName: string) {
    this.data[entityName].map(async (entity, index: number) => {
      const url: string = entity.url;
      const { relationId } = await this.getIdFromUrl(url);
      entity.id = relationId;

      const entityCopy = structuredClone(entity);
      this.relations.map((parameter) => {
        delete entityCopy[parameter];
      });
      delete this.dataWithRelations[entityName][index]['url'];
      this.data[entityName][index] = plainToInstance(
        EntityAll[entityName],
        entityCopy,
      );
    });
  }
  public async getIdFromUrl(url: string) {
    const arr = url.match(/([a-z]+\/\d+)/)[0].split('/');
    return { relationEntityName: arr[0], relationId: Number(arr[1]) };
  }
}
