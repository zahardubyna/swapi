import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityModule } from './entity/entity.module';
import dataSourceOptions from '../database/config';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    EntityModule,
  ],
})
export class AppModule {}
