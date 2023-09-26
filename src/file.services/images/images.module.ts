import { Module } from '@nestjs/common';
import { FileImagesService } from './images.service';
import { FileService } from '../file/file.service';

@Module({
  providers: [FileImagesService, FileService],
})
export class ImagesModule {}
