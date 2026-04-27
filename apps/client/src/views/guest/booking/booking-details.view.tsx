import { Link, useNavigate, useParams } from 'react-router-dom';
import useFetchBookingByID from '../../../hooks/api/booking/useFetchBooking.hook.ts';
import { Booking } from '../../../types/booking/booking.type.ts';
import ListingImageCarousel from '../../../components/hosting/listing/listing-image-carousel.component.tsx';
import useCancelBooking from '../../../hooks/api/booking/useCancelBooking.hook.ts';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';

function BookingDetailsCard({ booking }: { booking: Booking }) {
  return (
    <div className={'w-full gap-4 grid grid-cols-4'}>
      <div className="col-span-4">
        <h1 className={'font-bold text-xl'}>Booking Details</h1>

      </div>

      <div className={'col-span-2 h-48 border-2 rounded-xl border-base-300 p-4 flex flex-col justify-between'}>
        <div>
          <h3 className={'font-bold text-lg'}>Cost Breakdown</h3>
          <p className={'font-bold text-2xl mt-2'}>${booking.totalCharge}</p>
        </div>


        <div className="flex flex-col gap-0 mt-4">
          <div className={'flex justify-between text-gray-500'}>
            <h3>Base Charge</h3>
            <p>${booking.totalCharge - Math.round(booking.totalCharge * 0.12)}</p>
          </div>
          <div className={'flex justify-between mt-4 text-gray-500'}>
            <h3>Tax</h3>
            <p>${Math.round(booking.totalCharge * 0.12)}</p>
          </div>
        </div>

      </div>

      <div className={' border-2 rounded-xl border-base-300 p-4'}>
        <h3 className={'font-bold text-lg mb-2'}>Check In</h3>
        <p className={'text-gray-500'}>{dayjs(new Date(booking.checkInDate)).format('ddd, DD MMM YYYY')}</p>
      </div>

      <div className={' border-2 rounded-xl border-base-300 p-4'}>
        <h3 className={'font-bold text-lg mb-2'}>Check Out</h3>
        <p className={'text-gray-500'}>{dayjs(new Date(booking.checkOutDate)).format('ddd, DD MMM YYYY')}</p>
      </div>

      <div />
    </div>
  );
}

function BookingDetailsView() {

  const { bookingId } = useParams();
  const navigate = useNavigate();

  const { data, isFetched } = useFetchBookingByID(bookingId!);
  const booking: Booking = data?.data;

  const { mutate: cancelBooking } = useCancelBooking();

  const handleCancelBooking = () => {
    cancelBooking(bookingId!, {
      onSuccess: () => {
        toast.success('Booking cancelled successfully');
        navigate('/my-bookings');
      },
      onError: () => {
        toast.error('Failed to cancel booking');
      },
    });
  };

  if (!isFetched) {
    return <div>Loading...</div>;
  }

  return isFetched && (
    <div className={'grid grid-cols-4 gap-4 my-4'}>
      <div className={'flex flex-col gap-4'}>
        <ListingImageCarousel listingImages={booking.listing.images} />
        <div>
          <h3 className="font-bold text-xl">{booking.listing.title}</h3>
          <p className="text-gray-500 mt-2">{booking.listing.description}</p>
        </div>

        <Link className={'btn w-full btn-ghost btn-outline'} to={`/listing/${booking.listing.id}`}>
          View Listing
        </Link>
      </div>

      <div className="col-span-3 flex flex-col gap-4">
        <BookingDetailsCard booking={booking} />

        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-bold">Need help with this booking?</h3>

          <ul className={'list-disc ml-6'}>
            <li>
              <button onClick={handleCancelBooking} className="link text-gray-500">Cancel booking</button>
            </li>
          </ul>

        </div>
      </div>
    </div>
  );
}

export default BookingDetailsView;
