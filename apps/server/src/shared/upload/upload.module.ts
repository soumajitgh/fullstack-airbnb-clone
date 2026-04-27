import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UploadService } from './upload.service';
import { ListingUploadService } from './listing-upload.service';

@Module({
  imports: [ConfigModule],
  providers: [UploadService, ListingUploadService],
  exports: [ListingUploadService, UploadService],
})
export class UploadModule {}
