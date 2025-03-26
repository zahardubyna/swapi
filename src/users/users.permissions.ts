import { Permissions } from '@casl/casl.interface';
import { UserEntity } from './entity/user.entity';

export enum UserActions {
  get = 'get',
  // getMe = 'getMe',
  getById = 'getById',
  create = 'create',
  update = 'update',
  delete = 'delete',
}

export const permissions: Permissions = {
  everyone(user, { can }) {
    // all users can read their own user object
    can(UserActions.get, UserEntity, { id: user.id });
  },

  admin(user, { can }) {
    // Admin can read all
    can([UserActions.get, UserActions.getById], UserEntity);

    can(UserActions.update, UserEntity, ['id', 'username'], {
      role: { $nin: 'admin' },
    });

    can(UserActions.delete, UserEntity, { id: { $ne: user.id } });
  },
};
