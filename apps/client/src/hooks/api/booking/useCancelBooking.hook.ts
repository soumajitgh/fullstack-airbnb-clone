import { useMutation } from '@tanstack/react-query';
import useAxiosPrivate from '../../auth/useAxiosPrivate.ts';

const useCancelBooking = () => {
  const axiosPrivateInstance = useAxiosPrivate();

  const cancelBookingFn = async (id: string) => {
    return axiosPrivateInstance.delete(`/booking/${id}`);
  };

  return useMutation({ mutationFn: cancelBookingFn });
};

export default useCancelBooking;