import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesModule } from '@file.services/images/images.module';
import { CaslModule } from '@casl/casl.module';
import { PlanetEntity } from './planetEntity/planet.entity';
import { PlanetService } from './planet.service';
import { PlanetController } from './planet.controller';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([PlanetEntity]), ImagesModule, CaslModule],
  controllers: [PlanetController],
  providers: [PlanetService, ConfigService, JwtService],
})
export class PlanetModule {}
