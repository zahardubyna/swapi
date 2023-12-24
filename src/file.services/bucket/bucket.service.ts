import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  PutObjectCommandOutput,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import 'dotenv/config';

@Injectable()
export class BucketService {
  private readonly bucketName: string;
  private readonly region: string;
  private readonly s3: S3Client;
  constructor(private configService: ConfigService) {
    this.bucketName = this.configService.get<string>('BUCKET_NAME');
    this.region = this.configService.get<string>('BUCKET_REGION');
    this.s3 = new S3Client({
      credentials: {
        accessKeyId: this.configService.get<string>('ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get<string>('SECRET_ACCESS_KEY'),
      },
      region: this.region,
    });
  }

  async appendFileToBucket(name: string, buffer: Buffer, mimetype: string) {
    const params = {
      Bucket: this.bucketName,
      Key: name,
      Body: buffer,
      ContentType: mimetype,
    };
    try {
      const putObjectCommand = new PutObjectCommand(params);
      const res: PutObjectCommandOutput = await this.s3.send(putObjectCommand);

      if (res.$metadata.httpStatusCode === 200) {
        const getObjectCommand = new GetObjectCommand({
          Bucket: this.bucketName,
          Key: name,
        });
        return await getSignedUrl(this.s3, getObjectCommand);
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async deleteFile(fullName: string) {
    const [name, mimetype] = fullName.split('.');
    const params = {
      Bucket: this.bucketName,
      Key: name,
    };
    try {
      await this.s3.send(new DeleteObjectCommand(params));
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
