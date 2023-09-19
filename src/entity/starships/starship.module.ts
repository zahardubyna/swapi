import { Module } from '@nestjs/common';
import { StarshipController } from './starship.controller';
import { StarshipService } from './starship.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StarshipEntity } from './starshipsEntity/starship.entity';
import { FileImagesService } from '../../file.services/images/images.service';
import { FileService } from '../../file.services/file/file.service';

@Module({
  imports: [TypeOrmModule.forFeature([StarshipEntity])],
  controllers: [StarshipController],
  providers: [StarshipService, FileImagesService, FileService],
})
export class StarshipModule {}
