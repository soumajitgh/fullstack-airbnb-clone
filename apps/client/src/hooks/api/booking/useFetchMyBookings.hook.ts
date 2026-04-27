import { useQuery } from '@tanstack/react-query';
import useAxiosPrivate from '../../auth/useAxiosPrivate.ts';

const useFetchMyBookings = () => {
  const axiosPrivateInstance = useAxiosPrivate();

  const fetchMyBookings = async () => {
    return axiosPrivateInstance.get('/booking/my-bookings');
  };

  return useQuery({ queryKey: ['my-bookings'], queryFn: fetchMyBookings });
};

export default useFetchMyBookings;