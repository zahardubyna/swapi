import { PartialType } from '@nestjs/swagger';
import { SpecieCreateDto } from './specie.create.dto';

export class SpecieUpdateDto extends PartialType(SpecieCreateDto) {}
