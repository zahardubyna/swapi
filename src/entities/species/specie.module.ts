import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesModule } from '@file.services/images/images.module';
import { CaslModule } from '@casl/casl.module';
import { SpecieEntity } from '@entities/species/entity/specie.entity';
import { SpecieController } from './specie.controller';
import { SpecieService } from './specie.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { permissions } from '@entities/entity.permissions';

@Module({
  imports: [
    TypeOrmModule.forFeature([SpecieEntity]),
    ImagesModule,
    CaslModule.forFeature({ permissions }),
  ],
  controllers: [SpecieController],
  providers: [SpecieService, ConfigService, JwtService],
})
export class SpecieModule {}
