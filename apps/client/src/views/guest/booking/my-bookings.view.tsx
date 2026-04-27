import useFetchMyBookings from '../../../hooks/api/booking/useFetchMyBookings.hook.ts';
import { Booking } from '../../../types/booking/booking.type.ts';
import MyBookingCard from '../../../types/booking/componenets/my-booking-card.component.tsx';
import EmptyCard from '../../../components/common/cards/empty-card.component.tsx';
import { Link } from 'react-router-dom';

function MyBookingsView() {

  const { data, isFetched } = useFetchMyBookings();

  const bookings: Booking[] = data?.data;

  return isFetched && (
    <div className={'flex flex-col gap-4'}>
      <h1 className={'text-2xl font-bold mb-4'}>My Bookings</h1>

      {bookings.length > 0 ? <div className="flex flex-col gap-4 h-[74vh] overflow-y-scroll no-scrollbar rounded-xl">
        <>
          {
            bookings.map((booking) => (
              <MyBookingCard key={booking.id} booking={booking} />
            ))
          }
        </>
      </div> : (
        <EmptyCard className={'h-96'}>
          <p>No bookings found. Book your first hotel now!</p>
          <Link to={'/'} className={'btn btn-ghost btn-outline'}>Book Now</Link>
        </EmptyCard>
      )}
    </div>
  );
}

export default MyBookingsView;