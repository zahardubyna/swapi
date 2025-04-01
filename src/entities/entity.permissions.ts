import { Permissions } from '@casl/casl.interface';
import { Entities } from '../relation/entity.all';
import { Actions } from '@casl/actions.enum';

// apply permissions based on entity structure
export const permissions: Permissions = {
  everyone(user, { can }) {
    Object.values(Entities).forEach((entity) => {
      // All users can read their own records
      can(Actions.get, entity, { id: user.id });
    });
  },

  admin(user, { can }) {
    Object.values(Entities).forEach((entity) => {
      // Admins can perform all actions on all entities
      can(
        [Actions.get, Actions.create, Actions.update, Actions.delete],
        entity,
      );
    });
  },
};
