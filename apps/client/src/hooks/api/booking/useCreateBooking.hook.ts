import useAxiosPrivate from '../../auth/useAxiosPrivate.ts';
import { useMutation } from '@tanstack/react-query';

const URLS = {
  newBookings: (listingId: string) => `booking/${listingId}`,
};

type CreateBookingDto = {
  listingId: string;
  checkInDate: Date;
  checkOutDate: Date;
}

const useCreateBooking = () => {
  const axiosPrivateInstance = useAxiosPrivate();

  const mutateFunction = (createBookingDto: CreateBookingDto) => {
    const { listingId, checkInDate, checkOutDate } = createBookingDto;

    return axiosPrivateInstance.post(URLS.newBookings(listingId), {
      checkInDate: checkInDate.toISOString(),
      checkOutDate: checkOutDate.toISOString(),
    });
  };

  return useMutation({ mutationFn: mutateFunction });
};

export default useCreateBooking;