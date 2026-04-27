import { Booking } from '../types/booking/booking.type.ts';

export const calculateBookingCostings = (totalNights: number, listingPrice: number) => {
  return {
    totalPriceBeforeTax: Math.round(totalNights * listingPrice),
    tax: Math.round(totalNights * listingPrice * 0.12),
    totalPrice: Math.round(totalNights * listingPrice * 1.12),
  };
};

/**
 * Checks if a booking is reserved for the given check-in and check-out dates.
 * @param {Date} checkIn - The check-in date.
 * @param {Date} checkOut - The check-out date.
 * @param {Booking[]} bookings - The list of existing bookings.
 * @returns {boolean} - Returns true if the booking is reserved, otherwise false.
 */
export const isBookingReserved = (checkIn: Date, checkOut: Date, bookings: Booking[]): boolean => {

  for (const booking of bookings) {
    const isCheckInReserved = checkIn >= new Date(booking.checkInDate) && checkIn <= new Date(booking.checkOutDate);
    const isCheckOutReserved = checkOut >= new Date(booking.checkInDate) && checkOut <= new Date(booking.checkOutDate);

    if (isCheckInReserved || isCheckOutReserved) {
      return true;
    }
  }

  return false;
};