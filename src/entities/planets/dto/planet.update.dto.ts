import { PartialType } from '@nestjs/swagger';
import { PlanetCreateDto } from './planet.create.dto';

export class PlanetUpdateDto extends PartialType(PlanetCreateDto) {}
