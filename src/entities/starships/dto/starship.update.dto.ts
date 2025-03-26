import { PartialType } from '@nestjs/swagger';
import { StarshipCreateDto } from './starship.create.dto';

export class StarshipUpdateDto extends PartialType(StarshipCreateDto) {}
