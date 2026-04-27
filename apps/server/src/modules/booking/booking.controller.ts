import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { CreateBookingDto } from '../listing/dto/CRUD/create-booking.dto';
import { BookingService } from './booking.service';
import { JwtGuard } from '../auth/guards/jwt-auth.guard';
import { Booking } from './booking.entity';

@Controller('booking')
@UseGuards(JwtGuard)
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  /**
   * Retrieves all bookings made by the authenticated user.
   * @param {User} user - The authenticated user.
   * @returns {Promise<Booking[]>} A promise that resolves to an array of bookings.
   */
  @Get('/my-bookings')
  getBookings(@GetUser() user: User): Promise<Booking[]> {
    return this.bookingService.getBookingsByUser(user);
  }

  /**
   * Retrieves a specific booking made by the authenticated user.
   * @param {User} user - The authenticated user.
   * @param {string} bookingId - The ID of the booking to retrieve.
   * @returns {Promise<Booking>} A promise that resolves to the booking.
   */
  @Get('/my-bookings/:bookingId')
  getMyBooking(
    @GetUser() user: User,
    @Param('bookingId') bookingId: string,
  ): Promise<Booking> {
    return this.bookingService.getBookingByUser(bookingId, user);
  }

  /**
   * Retrieves upcoming reservations for the authenticated host.
   * @param {User} user - The authenticated host.
   * @returns {Promise<Booking[]>} A promise that resolves to an array of bookings.
   */
  @Get('/host-reservations/upcoming')
  getHostUpcomingReservations(@GetUser() user: User): Promise<Booking[]> {
    return this.bookingService.getHostUpcomingReservations(user);
  }

  /**
   * Creates a new booking for a listing.
   * @param {string} listingId - The ID of the listing to book.
   * @param {CreateBookingDto} createBookingDto - The data transfer object containing the booking details.
   * @param {User} user - The authenticated user making the booking.
   * @returns {Promise<Booking>} A promise that resolves to the created booking.
   */
  @Post('/:listingId')
  createBooking(
    @Param('listingId') listingId: string,
    @Body()
    createBookingDto: CreateBookingDto,
    @GetUser() user: User,
  ): Promise<Booking> {
    return this.bookingService.createBooking(listingId, createBookingDto, user);
  }

  /**
   * Deletes a booking.
   * @param {string} bookingId - The ID of the booking to delete.
   * @param {User} user - The authenticated user attempting to delete the booking.
   * @returns {Promise<void>} A promise that resolves when the booking is deleted.
   */
  @Delete('/:bookingId')
  deleteBooking(
    @Param('bookingId') bookingId: string,
    @GetUser() user: User,
  ): Promise<void> {
    return this.bookingService.deleteBooking(bookingId, user);
  }
}
