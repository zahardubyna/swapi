import { Module } from '@nestjs/common';
import { FileImagesService } from './images.service';
import { FileService } from '../file/file.service';
import { BucketService } from '@file.services/bucket/bucket.service';

@Module({
  providers: [FileImagesService, FileService, BucketService],
  exports: [FileImagesService, FileService, BucketService]

})
export class ImagesModule {}
