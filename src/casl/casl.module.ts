import { DynamicModule, Module } from '@nestjs/common';
import { CASL_FEATURE_OPTIONS } from './casl.constants';
import { CaslService } from './casl.service';
import { PermissionsFactory } from './factories/permissions.factory';
import { AuthorizableUser, ModuleOptionsForFeature } from './casl.interface';

@Module({
  providers: [
    {
      provide: CASL_FEATURE_OPTIONS,
      useValue: {},
    },
    CaslService,
    PermissionsFactory,
  ],
  exports: [CaslService, PermissionsFactory],
})

export class CaslModule {
  static forFeature(options: ModuleOptionsForFeature): DynamicModule {
    return {
      module: CaslModule,
      exports: [CaslModule],
      providers: [
        CaslService,
        PermissionsFactory,
        {
          provide: CASL_FEATURE_OPTIONS,
          useValue: options,
        },
      ],
    };
  }

}