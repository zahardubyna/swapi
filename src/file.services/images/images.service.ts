import { Injectable } from '@nestjs/common';
import { FileService } from '../file/file.service';
import { v4 as uuidv4 } from 'uuid';
import { ImagesEntity } from './imageEntity/images.entity';
import { plainToClassFromExist } from 'class-transformer';
import { DataSource } from "typeorm";
import dataSource from "../../../database/datasource.config";
@Injectable()
export class FileImagesService {
  constructor(
    private fileServices: FileService,
  ) {}

  async appendFiles(files: Express.Multer.File[]) {
    const resFiles: ImagesEntity[] = [];

    files.map(async (file) => {
      const fileName =
        uuidv4() + file.originalname.match(/\.(jpg|jpag|png)$/)[0];

      const resFile = {
        file_name: fileName,
        file_original_name: file.originalname,
      };

      resFiles.push(plainToClassFromExist(new ImagesEntity(), resFile));
      await this.fileServices.appendFileToPublic(fileName, file.buffer);
    });
    return resFiles;
  }

  async deleteFiles(images: ImagesEntity[]) {
    images.map(async (image) => {
      await this.fileServices.deleteFileInPublic(image.file_name);
      await dataSource.manager.remove(image);
    });
  }
}
