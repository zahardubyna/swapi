import {
  AbilityBuilder,
  ExtractSubjectType,
  Subject,
  createMongoAbility,
} from '@casl/ability';
import { AnyClass } from '@casl/ability/dist/types/types';
import * as extra from '@casl/ability/extra';
import { Inject, Injectable } from '@nestjs/common';
import { CASL_FEATURE_OPTIONS } from '../casl.constants';
import { AppAbility, AuthorizableUser, ModuleOptionsForFeature } from '../casl.interface';

@Injectable()
export class PermissionsFactory {
  constructor(
    @Inject(CASL_FEATURE_OPTIONS)
    private options: ModuleOptionsForFeature,
  ) {}

  defineAbilityForUser(user: AuthorizableUser) {
    const builder = new AbilityBuilder<AppAbility>(createMongoAbility);

    const { permissions } = this.options;

    if (permissions?.everyone) {
      permissions?.everyone(user, builder);
    }
    // console.log(this.options);
    if (typeof permissions[user.role] === 'function') {
      permissions[user.role](user, builder);
    }

    return builder.build({
      detectSubjectType: (object) =>
        object.constructor as ExtractSubjectType<AnyClass<Subject>>,
    });
  }

  definePermittedFieldForAbility(
    ability: AppAbility,
    action: string,
    subject: Subject,
  ) {
    return extra.permittedFieldsOf(ability, action, subject, {
      fieldsFrom: (rule) => rule.fields || [],
    });
  }
}