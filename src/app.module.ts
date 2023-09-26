import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityModule } from './entity/entity.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import dataSourceOptions from '../database/config';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    EntityModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../', 'public/main'),
    }),
  ],
})
export class AppModule {}
