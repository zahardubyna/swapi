import { PartialType } from '@nestjs/swagger';
import { FilmCreateDto } from './film.create.dto';

export class FilmUpdateDto extends PartialType(FilmCreateDto) {}
