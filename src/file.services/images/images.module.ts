import { Module } from '@nestjs/common';
import { FileImagesService } from './images.service';

@Module({
  providers: [FileImagesService],
})
export class ImagesModule {}
