import EmptyCard from '../../../../components/common/cards/empty-card.component.tsx';
import { Booking } from '../../../../types/booking/booking.type.ts';
import dayjs from 'dayjs';

export default function ReservationList({ reservations }: { reservations: Booking[] }) {
  return reservations.length > 0 ? (
    <div>
      <h3 className={'font-bold text-2xl mb-4'}>
        Reservations
      </h3>
      <div className={'flex flex-col gap-4 h-96 overflow-scroll rounded-lg no-scrollbar'}>
        {
          reservations.map((reservation) => (
            <div key={reservation.id} className={'border-2 p-4 rounded-lg hover:shadow-xl'}>
              <p className={'text-gray-500 text-sm'}>Booking ID: {reservation.id}</p>

              <div className="grid grid-cols-4 mt-4">
                <div className="col-span-2">
                  <p className={'text-xl font-bold mb-2'}>Guest Details</p>
                  <p className={'text-gray-500'}>Name: {reservation.user.email.split('@')[0]}</p>
                  <p className={'text-gray-500'}>Email: {reservation.user.email}</p>
                </div>

                <div>
                  <p className={'text-xl font-bold mb-2'}>Check In</p>
                  <p
                    className={'text-gray-500'}>{dayjs(new Date(reservation.checkInDate)).format('ddd, DD MMM YYYY')}</p>
                </div>

                <div>
                  <p className={'text-xl font-bold mb-2'}>Check In</p>
                  <p
                    className={'text-gray-500'}>{dayjs(new Date(reservation.checkOutDate)).format('ddd, DD MMM YYYY')}</p>
                </div>
              </div>

            </div>
          ))
        }
      </div>
    </div>
  ) : (
    <EmptyCard className={'h-80'}>
      <p>No reservations found</p>
    </EmptyCard>
  );
}