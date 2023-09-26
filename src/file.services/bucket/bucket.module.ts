import { Module } from '@nestjs/common';
import { BucketService } from './bucket.service';

@Module({
  providers: [BucketService],
})
export class BucketModule {}
