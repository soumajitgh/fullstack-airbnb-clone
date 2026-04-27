import useFetchUpcomingReservations from '../../../hooks/api/host-reservations/useFetchUpcomingReservations.hook.ts';
import { Booking } from '../../../types/booking/booking.type.ts';
import dayjs from 'dayjs';
import EmptyCard from '../../../components/common/cards/empty-card.component.tsx';

function ReservationCard({ reservation }: { reservation: Booking }) {
  return (
    <div className={'grid grid-cols-4 w-full border-2 border-base-200 p-4 rounded-xl hover:shadow-xl'}>
      <div className={'col-span-2 h-48 flex gap-2 flex-col justify-between'}>
        <div>
          <h4 className={'font-bold text-xl mb-2'}>Guest Details</h4>
          <p className={'text-gray-500'}>{reservation.user.email.split('@')[0]}</p>
          <p className={'text-gray-500'}>{reservation.user.email}</p>
        </div>

        <p className={'text-gray-500'}>Booked on listing: {reservation.listing.title}</p>
      </div>
      <div>
        <h4 className={'font-bold text-xl mb-2'}>Check In</h4>
        <p className={'text-gray-500'}>{dayjs(new Date(reservation.checkInDate)).format('ddd, DD MMM YYYY')}</p>
      </div>
      <div>
        <h4 className={'font-bold text-xl mb-2'}>Check Out</h4>
        <p className={'text-gray-500'}>{dayjs(new Date(reservation.checkOutDate)).format('ddd, DD MMM YYYY')}</p>
      </div>
    </div>
  );
}

export default function MyHostingReservations() {

  const { data, isFetched } = useFetchUpcomingReservations();

  const reservations: Booking[] = data?.data;

  return isFetched && (
    <div className={'my-4'}>
      <h1 className={'text-2xl font-bold mb-8'}>Upcoming Reservations</h1>

      {reservations.length > 0 ? (
        <div className="flex flex-col gap-4 overflow-y-scroll h-[70vh] no-scrollbar">
          {
            reservations.map((reservation) => (
              <ReservationCard key={reservation.id} reservation={reservation} />
            ))
          }
        </div>
      ) : (
        <EmptyCard className={'h-96'}>
          <p className={'text-gray-500'}>No upcoming reservations. You can check your reservations here.</p>
        </EmptyCard>
      )}
    </div>
  );
}