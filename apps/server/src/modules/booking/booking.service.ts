import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { BookingRepository } from './booking.repository';
import { User } from '../auth/user.entity';
import { CreateBookingDto } from '../listing/dto/CRUD/create-booking.dto';
import { ListingRepository } from '../listing/listing.repository';
import { Booking } from './booking.entity';
import { LessThanOrEqual, MoreThanOrEqual } from 'typeorm';

@Injectable()
export class BookingService {
  logger = new Logger(BookingService.name);

  constructor(
    private readonly bookingRepository: BookingRepository,
    private readonly listingRepository: ListingRepository,
  ) {}

  /**
   * Retrieves all bookings made by a user.
   * @param {User} user - The user whose bookings are to be retrieved.
   * @returns {Promise<Booking[]>} A promise that resolves to an array of bookings.
   */
  getBookingsByUser(user: User): Promise<Booking[]> {
    return this.bookingRepository.find({
      where: { user },
      relations: ['listing'],
    });
  }

  /**
   * Retrieves a booking by its ID for a given user.
   * @param {string} bookingId - The ID of the booking to retrieve.
   * @param {User} user - The user whose booking is to be retrieved.
   * @returns {Promise<Booking>} A promise that resolves to the booking.
   */
  getBookingByUser(bookingId: string, user: User): Promise<Booking> {
    return this.bookingRepository.findOne({
      where: { id: bookingId, user },
      relations: ['listing'],
    });
  }

  /**
   * Retrieves upcoming reservations for a host.
   * @param {User} user - The host whose upcoming reservations are to be retrieved.
   * @returns {Promise<Booking[]>} A promise that resolves to an array of bookings.
   */
  async getHostUpcomingReservations(user: User): Promise<Booking[]> {
    return this.bookingRepository.find({
      where: {
        listing: { host: user },
        checkOutDate: MoreThanOrEqual(new Date().toISOString()),
      },
      relations: ['listing'],
    });
  }

  /**
   * Creates a new booking for a listing.
   * @param {string} listingId - The ID of the listing to book.
   * @param {CreateBookingDto} createBookingDto - The booking details.
   * @param {User} user - The user creating the booking.
   * @returns {Promise<Booking>} The created booking.
   * @throws {NotFoundException} If the listing is not found.
   * @throws {BadRequestException} If the listing is already booked for the selected dates.
   */
  async createBooking(
    listingId: string,
    createBookingDto: CreateBookingDto,
    user: User,
  ): Promise<Booking> {
    const { checkInDate, checkOutDate } = createBookingDto;

    const checkInDateFormated = new Date(checkInDate);
    const checkOutDateFormated = new Date(checkOutDate);

    // Find the listing by ID
    const listing = await this.listingRepository.findOne({
      where: { id: listingId },
    });

    if (!listing) {
      throw new NotFoundException(`Listing with id ${listingId} not found`);
    }

    // Check for overlapping bookings
    const previousBooking = listing.bookings;

    previousBooking.forEach((booking) => {
      if (
        (checkInDate >= booking.checkInDate &&
          checkOutDate <= booking.checkOutDate) ||
        (checkInDate >= booking.checkInDate &&
          checkOutDate <= booking.checkOutDate)
      ) {
        throw new BadRequestException(
          `Listing with id ${listingId} is already booked for the selected dates`,
        );
      }
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const differenceInMilliSec = checkOutDateFormated - checkInDateFormated;
    const differenceInDays = Math.round(
      differenceInMilliSec / (1000 * 60 * 60 * 24),
    );

    const totalBaseCharge = listing.costing * differenceInDays;
    const totalTax = Math.round(totalBaseCharge * 0.12);
    const totalCharge = totalBaseCharge + totalTax;

    // Create the new booking
    const booking = await this.bookingRepository.createBooking(
      listing,
      createBookingDto,
      totalCharge,
      user,
    );

    this.logger.verbose(`Booking ${booking.id} created by user ${user.id}`);

    // Return the created booking
    return booking;
  }

  /**
   * Deletes a booking.
   * @param {string} bookingId - The ID of the booking to delete.
   * @param {User} user - The user attempting to delete the booking.
   * @returns {Promise<void>} A promise that resolves when the booking is deleted.
   * @throws {NotFoundException} If the booking is not found.
   * @throws {BadRequestException} If the user is not authorized to delete the booking.
   */
  async deleteBooking(bookingId: string, user: User): Promise<void> {
    // Find the booking by ID
    const booking = await this.bookingRepository.findOne({
      where: { id: bookingId, user: user },
    });

    if (!booking) {
      throw new NotFoundException(`Booking with id ${bookingId} not found`);
    }

    // Check if the user is authorized to delete the booking
    if (user.id !== booking.user.id) {
      throw new BadRequestException(
        `You are not authorized to delete booking with id ${bookingId}`,
      );
    }

    // Delete the booking
    await this.bookingRepository.remove(booking);
  }
}
