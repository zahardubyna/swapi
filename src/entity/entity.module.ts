import { Module } from '@nestjs/common';
import { PeopleModule } from './people/people.module';

@Module({ imports: [PeopleModule] })
export class EntityModule {}
