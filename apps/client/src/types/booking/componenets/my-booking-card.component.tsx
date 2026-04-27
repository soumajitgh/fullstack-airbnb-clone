import { Booking } from '../booking.type.ts';
import ListingImageCarousel from '../../../components/hosting/listing/listing-image-carousel.component.tsx';
import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import { Link } from 'react-router-dom';

dayjs.extend(calendar);

function MyBookingCard({ booking }: { booking: Booking }) {
  return (
    <Link to={`/booking/${booking.id}`}
          className={'p-4 grid grid-cols-5 gap-4 w-full shadow-black rounded-xl border-2 hover:shadow-xl'}>
      <ListingImageCarousel listingImages={booking.listing.images} />

      <div className={'flex flex-grow flex-col col-span-2'}>
        <h3 className={'font-bold text-xl'}>
          {booking.listing.title}
        </h3>

        <p className={'text-gray-500'}>
          {booking.listing.description}
        </p>
      </div>


      <div className="flex flex-col flex-grow">
        <h3 className={'font-bold text-xl'}>Check In</h3>

        <p className={'text-gray-500'}>{dayjs(new Date(booking.checkInDate)).format('dddd, DD MMM YYYY')}</p>
      </div>
      <div className="flex flex-col flex-grow">
        <h3 className={'font-bold text-xl'}>Check Out</h3>

        <p className={'text-gray-500'}>{dayjs(new Date(booking.checkOutDate)).format('dddd, DD MMM YYYY')}</p>
      </div>

    </Link>
  );
}

export default MyBookingCard;