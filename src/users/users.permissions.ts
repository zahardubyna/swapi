import { Permissions } from '@casl/casl.interface';
import { Actions } from '@casl/actions.enum';
import { UserEntity } from './entity/user.entity';

export const permissions: Permissions = {
  everyone(user, { can }) {
    can(Actions.get, UserEntity);
  },

  admin(user, { can }) {
    // Admin can read all
    can(Actions.get, UserEntity);
  },
};
