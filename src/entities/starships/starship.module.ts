import { Module } from '@nestjs/common';
import { StarshipController } from './starship.controller';
import { StarshipService } from './starship.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesModule } from '@file.services/images/images.module';
import { CaslModule } from '@casl/casl.module';
import { StarshipEntity } from './starshipEntity/starship.entity';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([StarshipEntity]),
    ImagesModule,
    CaslModule,
  ],
  controllers: [StarshipController],
  providers: [StarshipService, ConfigService, JwtService],
})
export class StarshipModule {}
