import { Listing } from '../../../../types/listing/listing.type.ts';
import DatePicker from 'react-datepicker';
import { Controller, useForm } from 'react-hook-form';
import useCreateBooking from '../../../../hooks/api/booking/useCreateBooking.hook.ts';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { differenceInDays } from '../../../../utils/date.util.ts';
import { calculateBookingCostings, isBookingReserved } from '../../../../utils/booking.util.ts';

type ListingBookingCardProps = {
  listing: Listing;
  checkInDate: Date | undefined;
  checkOutDate: Date | undefined;
}

type BookingInputs = {
  checkIn: Date,
  checkOut: Date,
};

export default function ListingBookingCard({ listing, checkInDate, checkOutDate }: ListingBookingCardProps) {

  const navigate = useNavigate();
  const { mutateAsync: createBooking } = useCreateBooking();

  const { control, watch, handleSubmit } = useForm<BookingInputs>({
    defaultValues: {
      checkIn: checkInDate,
      checkOut: checkOutDate,
    },
  });

  const totalNights = differenceInDays(watch('checkIn'), watch('checkOut'));
  const pricingDetails = calculateBookingCostings(totalNights, listing.costing);
  const isListingBooked = isBookingReserved(watch('checkIn'), watch('checkOut'), listing.bookings);

  const onSubmit = async (data: BookingInputs) => {
    await createBooking(
      {
        listingId: listing.id,
        checkInDate: data.checkIn,
        checkOutDate: data.checkOut,
      },
      {
        onSuccess: () => {
          toast.success('Booking created successfully');
          navigate('/my-bookings');
        },
        onError: () => {
          toast.error('Failed to create booking');
        },
      },
    );
  };

  return (
    <div className={'w-full flex  flex-col gap-4 border-2 border-base-300 rounded-xl shadow-xl p-8'}>
      <h3 className={'text-2xl font-bold'}>
        ${listing.costing} <span className={'text-xl font-normal text-gray-500'}>night</span>
      </h3>

      <form className={'flex flex-col'} id="bookingForm" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="checkIn"
          render={({ field }) => (
            <DatePicker
              dateFormat={'dd/MM/yyyy'}
              className="input input-bordered rounded-b-none w-full"
              placeholderText={'Check In'}
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              selectsStart
              startDate={watch('checkIn')}
              endDate={watch('checkOut')}
            />)}
        />

        <Controller
          control={control}
          name="checkOut"
          render={({ field }) => (
            <DatePicker
              dateFormat={'dd/MM/yyyy'}
              className="input input-bordered rounded-none w-full"
              calendarClassName={'z-50'}
              placeholderText={'Check Out'}
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              selectsEnd
              startDate={watch('checkIn')}
              endDate={watch('checkOut')}
              minDate={watch('checkIn')}
            />)}
        />

        <button className="btn btn-primary rounded-t-none"
                disabled={isListingBooked}>{isListingBooked ? 'Already Reserved' : 'Reserve'}</button>
      </form>

      {
        (watch('checkIn') && watch('checkOut')) && (
          <div className={'flex flex-col w-full items-center gap-4 text-lg'}>
            <p className={'text-gray-500 text-sm'}>You won't be charged yet</p>

            <div className={'flex w-full justify-between'}>
              <p>${listing.costing} x {totalNights} nights</p>
              <p>${pricingDetails.totalPriceBeforeTax}</p>
            </div>

            <div className={'flex w-full justify-between'}>
              <p>12% Tax</p>
              <p>${pricingDetails.tax}</p>
            </div>

            <div className="divider my-0" />

            <div className={'flex w-full justify-between font-bold'}>
              <p>Total</p>
              <p>${pricingDetails.totalPrice}</p>
            </div>
          </div>
        )
      }
    </div>
  );
}
