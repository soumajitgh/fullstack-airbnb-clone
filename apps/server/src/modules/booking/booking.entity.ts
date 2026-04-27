import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Listing } from '../listing/entities/listing.entity';
import { User } from '../auth/user.entity';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  checkInDate: string;

  @Column()
  checkOutDate: string;

  @Column()
  totalCharge: number;

  @ManyToOne(() => Listing, (listing) => listing.bookings, {
    onDelete: 'CASCADE',
  })
  listing: Listing;

  @ManyToOne(() => User, (user) => user, { eager: true })
  user: User;
}
