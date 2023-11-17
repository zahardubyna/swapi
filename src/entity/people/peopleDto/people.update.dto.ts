import { PartialType } from '@nestjs/swagger';
import { PeopleCreateDto } from './people.create.dto';

export class PeopleUpdateDto extends PartialType(PeopleCreateDto) {}
