import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanetEntity } from './planet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlanetEntity])],
})
export class PlanetModule {}
