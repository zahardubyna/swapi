import { Permissions } from '@casl/casl.interface';
import { Entities } from '../relation/entity.all';

// Define entity actions
export enum EntitiesActions {
  get = 'get',
  create = 'create',
  update = 'update',
  delete = 'delete',
}

// apply permissions based on entity structure
export const permissions: Permissions = {
  everyone(user, { can }) {
    Object.values(Entities).forEach((entity) => {
      // All users can read their own records
      can(EntitiesActions.get, entity, { id: user.id });
    });
  },

  admin(user, { can }) {
    Object.values(Entities).forEach((entity) => {
      // Admins can perform all actions on all entities
      can([EntitiesActions.get, EntitiesActions.create, EntitiesActions.update, EntitiesActions.delete], entity);
    });
  },
};
