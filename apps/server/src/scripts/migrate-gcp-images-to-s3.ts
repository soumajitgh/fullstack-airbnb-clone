import { NestFactory } from '@nestjs/core';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AppModule } from '../app.module';
import { ListingImage } from '../modules/listing/entities/listing-image.entity';
import { UploadService } from '../shared/upload/upload.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const listingImageRepository = app.get<Repository<ListingImage>>(
    getRepositoryToken(ListingImage),
  );
  const uploadService = app.get(UploadService);
  const listingImages = await listingImageRepository.find();

  let migrated = 0;
  let skipped = 0;
  let failed = 0;

  for (const listingImage of listingImages) {
    const nextPublicUrl = uploadService.getPublicUrl(
      listingImage.bucketLocation,
    );

    if (listingImage.publicUrl === nextPublicUrl) {
      skipped += 1;
      continue;
    }

    try {
      const response = await fetch(listingImage.publicUrl);

      if (!response.ok) {
        throw new Error(
          `Failed to download ${listingImage.publicUrl}: ${response.status} ${response.statusText}`,
        );
      }

      await uploadService.uploadBuffer(
        listingImage.bucketLocation,
        Buffer.from(await response.arrayBuffer()),
        response.headers.get('content-type') ?? undefined,
      );

      listingImage.publicUrl = nextPublicUrl;
      await listingImageRepository.save(listingImage);
      migrated += 1;
      console.log(`Migrated listing image ${listingImage.id}`);
    } catch (error) {
      failed += 1;
      console.error(
        `Failed to migrate listing image ${listingImage.id}`,
        error,
      );
    }
  }

  console.log(
    `Migration finished. migrated=${migrated} skipped=${skipped} failed=${failed}`,
  );

  await app.close();

  if (failed > 0) {
    process.exitCode = 1;
  }
}

bootstrap();
