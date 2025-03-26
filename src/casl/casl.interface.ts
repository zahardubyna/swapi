import { AbilityBuilder, AnyAbility } from '@casl/ability';
import { AnyClass } from '@casl/ability/dist/types/types';
import { Request } from 'express';

export type Roles = 'admin' | 'user';

export type AppAbility = AnyAbility;

export interface AuthorizableUser<role = string, id = string, email = string> {
  id: id;
  email: email;
  role: role;
}

export type DefinePermissionsForRole< user extends AuthorizableUser<unknown, unknown> = AuthorizableUser > = (
  user: user,
  builder: AbilityBuilder<AppAbility>,
) => void;

export type Permissions = Partial<Record<Roles | 'everyone', DefinePermissionsForRole>>;

export interface ModuleOptionsForFeature {
  permissions: Permissions;
}


export interface CaslGuardOptions {
  action: string;
  subjectClass: AnyClass;
  subjectHook: AnyClass<SubjectHook>;
}

export interface HookSubjectsSet {
  subject: Record<string, any>;
  enrichedSubject?: Record<string, any>;
}

export interface SubjectHook {
  getSubjectData(request: Request): Promise<HookSubjectsSet> | HookSubjectsSet;
}