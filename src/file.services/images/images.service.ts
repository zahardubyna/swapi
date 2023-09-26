import { Injectable } from '@nestjs/common';
import { plainToClassFromExist } from 'class-transformer';
import { FileService } from '../file/file.service';
import { BucketService } from '../bucket/bucket.service';
import { ImagesEntity } from './imageEntity/images.entity';
import dataSource from '../../../database/datasource.config';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FileImagesService {
  constructor(
    private fileServices: FileService,
    private bucketServices: BucketService,
  ) {}

  async appendFiles(files: Express.Multer.File[]) {
    const resFiles: ImagesEntity[] = [];

    await Promise.all(
      files.map(async (file) => {
        const name = uuidv4();
        file.mimetype = file.originalname.match(/\.(jpg|jpag|png)$/)[0];
        const fullName = name + file.mimetype;
        const aws_url = await this.bucketServices.appendFileToBucked(
          name,
          file.buffer,
          file.mimetype,
        );
        const resFile = {
          file_name: fullName,
          file_original_name: file.originalname,
          aws_url,
        };
        resFiles.push(plainToClassFromExist(new ImagesEntity(), resFile));
        await this.fileServices.appendFileToPublic(fullName, file.buffer);
      }),
    );
    return resFiles;
  }

  async deleteFiles(images: ImagesEntity[]) {
    images.map((image) => {
      this.bucketServices.deleteFile(image.file_name);
      this.fileServices.deleteFileInPublic(image.file_name);
    });
    return dataSource.manager.remove(images);
  }
}
