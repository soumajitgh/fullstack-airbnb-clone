import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Listing } from '../listing/entities/listing.entity';
import { Exclude } from 'class-transformer';
import { Booking } from '../booking/booking.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @OneToMany(() => Listing, (listing) => listing.host)
  listings: Listing[];

  @OneToMany(() => Booking, (booking) => booking.user)
  bookings: Booking[];
}
