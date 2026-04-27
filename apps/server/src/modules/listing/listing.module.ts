import { Module } from '@nestjs/common';
import { ListingController } from './listing.controller';
import { ListingService } from './services/listing.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Listing } from './entities/listing.entity';
import { AuthModule } from '../auth/auth.module';
import { ListingRepository } from './listing.repository';
import { ListingImage } from './entities/listing-image.entity';
import { ListingImageService } from './services/listing-image.service';
import { UploadModule } from '../../shared/upload/upload.module';
import { ListingLocation } from './entities/listing-location.entity';
import { Booking } from '../booking/booking.entity';
import { BookingService } from '../booking/booking.service';
import { BookingRepository } from '../booking/booking.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Listing, ListingImage, ListingLocation, Booking]),
    AuthModule,
    UploadModule,
  ],
  controllers: [ListingController],
  providers: [
    ListingService,
    ListingImageService,
    BookingService,
    ListingRepository,
    BookingRepository,
  ],
  exports: [ListingService, ListingRepository],
})
export class ListingModule {}
