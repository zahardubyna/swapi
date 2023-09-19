import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class FileService {
  async appendFileToPublic(name: string, buffer: Buffer) {
    try {
      await fs.writeFileSync(`./public/images/${name}`, buffer);
    } catch (err) {
      console.log(err);
    }
  }

  async deleteFileInPublic(name: string) {
    try {
      await fs.unlinkSync(`./public/images/${name}`);
    } catch (err) {
      console.log(err);
    }
  }
}
