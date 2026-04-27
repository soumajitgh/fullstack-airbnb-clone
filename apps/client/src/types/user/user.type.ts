import { Listing } from '../listing/listing.type.ts';

export type User = {
  id: string;

  email: string;

  listings: Listing[];
}