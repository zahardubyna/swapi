import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesModule } from '@file.services/images/images.module';
import { CaslModule } from '@casl/casl.module';
import { SpecieEntity } from './specieEntity/specie.entity';
import { SpecieController } from './specie.controller';
import { SpecieService } from './specie.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([SpecieEntity]), ImagesModule, CaslModule],
  controllers: [SpecieController],
  providers: [SpecieService, ConfigService, JwtService],
})
export class SpecieModule {}
