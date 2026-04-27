import { ListingImage } from './listing-image.type.ts';
import { User } from '../user/user.type.ts';
import { ListingLocation } from './listing-location.type.ts';
import { Booking } from '../booking/booking.type.ts';

export type Listing = {
  id: string;

  title: string;

  description?: string;

  costing: number;

  location: ListingLocation;

  host: User;

  images: ListingImage[];

  bookings: Booking[];
}