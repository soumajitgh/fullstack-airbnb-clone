import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../auth/user.entity';
import { ListingImage } from './listing-image.entity';
import { Booking } from '../../booking/booking.entity';
import { ListingLocation } from './listing-location.entity';

@Entity()
export class Listing {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description?: string;

  @Column()
  costing: number;

  @OneToOne(() => ListingLocation, { eager: true })
  @JoinColumn()
  location: ListingLocation;

  @ManyToOne(() => User, (user) => user.listings, { eager: true })
  host: User;

  @OneToMany(() => ListingImage, (image) => image.listing, { eager: true })
  images: ListingImage[];

  @OneToMany(() => Booking, (booking) => booking.listing, { eager: true })
  bookings: Booking[];
}
