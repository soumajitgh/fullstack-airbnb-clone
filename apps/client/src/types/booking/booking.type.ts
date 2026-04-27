import { Listing } from '../listing/listing.type.ts';
import { User } from '../user/user.type.ts';

export type Booking = {
  id: string;

  checkInDate: string;

  checkOutDate: string;

  totalCharge: number;

  listing: Listing;

  user: User;
}