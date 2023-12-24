import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { SeedService } from '../seed.service';
import { EntityAll } from '../../src/relation/entity.all';
import * as _ from 'lodash';

export class Seeds implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const seedService = new SeedService();

    await seedService.getData();

    for (const entity in seedService.data) {
      await connection.manager.save(
        EntityAll[entity],
        seedService.data[entity],
      );
    }

    const oldData = _.cloneDeep(seedService.data);
    for (const entityName in seedService.data) {
      await Promise.all(
        seedService.dataWithRelations[entityName].map(async (entity, index) => {
          for (const parameter of seedService.relations) {
            if (entity[parameter]) {
              for await (const url of Array.isArray(entity[parameter])
                ? entity[parameter]
                : [entity[parameter]]) {
                // '_'
                seedService.data[entityName][index][parameter] ||= [];

                const { relationEntityName, relationId } =
                  await seedService.getIdFromUrl(url);

                const relationEntity = oldData[relationEntityName].find(
                  (entity) => entity.id === relationId,
                );

                if (parameter === 'homeworld') {
                  seedService.data[entityName][index][parameter] =
                    relationEntity;
                } else {
                  if (
                    !seedService.data[entityName][index][parameter].find(
                      (entity) => entity.id === relationEntity.id,
                    )
                  ) {
                    seedService.data[entityName][index][parameter].push(
                      relationEntity,
                    );
                  }
                }
              }
            }
          }
          await connection.manager.save(
            EntityAll[entityName],
            seedService.data[entityName][index],
          );
        }),
      );
    }
    console.log(
      `\nseconds elapsed = ${(Date.now() - seedService.starts) / 1000}`,
    );
  }
}
