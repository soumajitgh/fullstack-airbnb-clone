import useAxiosPrivate from '../../auth/useAxiosPrivate.ts';
import { useQuery } from '@tanstack/react-query';

const useFetchUpcomingReservations = () => {
  const axiosPrivateInstance = useAxiosPrivate();

  return useQuery({
    queryKey: ['upcoming-reservations'],
    queryFn: () => axiosPrivateInstance.get('booking/host-reservations/upcoming'),
  });
};

export default useFetchUpcomingReservations;