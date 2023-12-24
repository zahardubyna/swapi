import dataSource from '../../database/datasource.config';
import { EntityAll } from './entity.all';
import { Entity, EntityTarget } from 'typeorm';

export async function createRelation<T extends EntityTarget<{ id: number }>, U>(
  id: number,
  dto: U,
  entity: T,
): Promise<void> {
  const relationEntity = await dataSource.manager.findOne(entity, {
    where: { id },
  });
  Promise.all(
    Object.keys(dto).map(async (relation: string) => {
      const arr = dto[relation];
      await Promise.all(
        (Array.isArray(arr) ? arr : [arr]).map(async (id: number) => {
          const type = EntityAll[relation];
          const essence: typeof type = await dataSource.manager.findOne(
            EntityAll[relation],
            {
              where: { id },
              loadEagerRelations: false,
            },
          );
          if (essence) {
            const targetProperty =
              relation === 'homeworld' ? 'homeworld' : relation;

            relationEntity[targetProperty] ||= [];

            targetProperty === 'homeworld'
              ? (relationEntity[targetProperty] = essence)
              : relationEntity[targetProperty].push(essence);
          }
        }),
      );
    }),
  ).then(async () => {
    return await dataSource.manager.save(relationEntity);
  });
}
