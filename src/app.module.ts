import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController, AppGetController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { PeopleEntity } from './entity/people/people.entity';
import { EntityModule } from './entity/entity.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 6033,
      username: 'root',
      password: 'root',
      database: 'starwars',
      entities: [PeopleEntity],
      synchronize: true,
    }),
    EntityModule,
  ],
  controllers: [AppController, AppGetController],
  providers: [AppService],
})
export class AppModule {}
