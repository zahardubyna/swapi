import dataSource from '../../../database/datasource.config';
import { EntityAll } from './entity.all';

export async function createRelation(id: number, dto, entity) {
  const relationEntity = await dataSource.manager.findOne(entity, {
    where: { id },
  });
  Promise.all(
    Object.keys(dto).map(async (relation) => {
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
    console.log(relationEntity);
    return await dataSource.manager.save(relationEntity);
  });
}
