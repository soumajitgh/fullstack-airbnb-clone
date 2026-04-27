import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Listing } from './listing.entity';

@Entity()
export class ListingLocation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal')
  lat: number;

  @Column('decimal')
  lng: number;

  @OneToOne(() => Listing, (listing) => listing.location, {
    onDelete: 'CASCADE',
  })
  listing: Listing;
}
