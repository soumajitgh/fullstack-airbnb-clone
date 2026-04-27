import useAxiosPrivate from '../../auth/useAxiosPrivate.ts';
import { useQuery } from '@tanstack/react-query';

const useFetchBookingByID = (bookingId: string) => {
  const axiosPrivateInstance = useAxiosPrivate();

  const fetchMyBookings = async () => {
    return axiosPrivateInstance.get(`/booking/my-bookings/${bookingId}`);
  };

  return useQuery({ queryKey: ['my-booking', bookingId], queryFn: fetchMyBookings });
};

export default useFetchBookingByID;