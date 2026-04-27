import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Booking } from './booking.entity';
import { CreateBookingDto } from '../listing/dto/CRUD/create-booking.dto';
import { User } from '../auth/user.entity';
import { Listing } from '../listing/entities/listing.entity';

@Injectable()
export class BookingRepository extends Repository<Booking> {
  constructor(private dataSource: DataSource) {
    super(Booking, dataSource.createEntityManager());
  }

  /**
   * Creates a new booking.
   * @param {Listing} listing - The listing being booked.
   * @param {CreateBookingDto} createBookingDto - The data transfer object containing the booking details.
   * @param {number} totalCharge - The total charge for the booking.
   * @param {User} user - The user making the booking.
   * @returns {Promise<Booking>} A promise that resolves to the created booking.
   */
  createBooking(
    listing: Listing,
    createBookingDto: CreateBookingDto,
    totalCharge: number,
    user: User,
  ): Promise<Booking> {
    const { checkInDate, checkOutDate } = createBookingDto;

    const booking = this.create({
      checkInDate,
      checkOutDate,
      totalCharge,
      listing,
      user,
    });

    return this.save(booking);
  }
}
