import { AnyClass, AnyObject } from '@casl/ability/dist/types/types';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
  UseGuards,
  applyDecorators,
} from '@nestjs/common';
import { ModuleRef, Reflector } from '@nestjs/core';
import { plainToInstance } from 'class-transformer';
import { CASL_GUARD_CONFIG } from '../casl.constants';
import { ForbiddenException } from '@nestjs/common';
import { CaslGuardOptions, SubjectHook } from '../casl.interface';
import { CaslService } from '../casl.service';
import { subjectHookFactory } from '../factories/subject-hook.factory';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private accessService: CaslService,
    private reflector: Reflector,
    private moduleRef: ModuleRef,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { action, subjectClass, subjectHook } =
      this.reflector.get<CaslGuardOptions>(
        CASL_GUARD_CONFIG,
        context.getHandler(),
      );
    const request = context.switchToHttp().getRequest();
    const { user } = request;

    // no user, or user.roles empty - throw error
    if (!user || !user.role) throw new ForbiddenException();

    // admin = access
    if (user.role?.includes('admin')) return true;

    let canActivate: boolean;

    // subjectHook uses for permissions with conditions checks
    if (subjectHook) {
      const factory = await subjectHookFactory(this.moduleRef, subjectHook);
      let { subject, enrichedSubject } = await factory.getSubjectData(request);

      // subject from request, contains data from request only (from body, params, query, or it's combination)
      subject = this.buildSubjectInstance(subjectClass, subject);

      // same subject, but get from database and contains additional data
      enrichedSubject = this.buildSubjectInstance(
        subjectClass,
        enrichedSubject,
      );

      canActivate = this.accessService.canAccess(
        user,
        action,
        subject,
        enrichedSubject,
      );
    } else {
      // subjectHook not used and specific subject instance not defined, conditions checks not supported
      canActivate = this.accessService.canAccess(user, action, subjectClass);
    }
    if (canActivate) return true;
    throw new ForbiddenException();
  }

  private buildSubjectInstance(subjectClass: AnyClass, object: AnyObject) {
    return plainToInstance(subjectClass, object, { exposeUnsetFields: false });
  }
}

export function UsePermissionsGuard(
  action: string,
  subjectClass: AnyClass,
  subjectHook?: AnyClass<SubjectHook>,
) {
  return applyDecorators(
    SetMetadata<string, CaslGuardOptions>(CASL_GUARD_CONFIG, {
      action,
      subjectClass,
      subjectHook,
    }),
    UseGuards(PermissionsGuard),
  );
}
