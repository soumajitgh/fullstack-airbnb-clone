import { useSearchParams } from 'react-router-dom';

const useBookingSearchParams = () => {
  const [searchParams] = useSearchParams();

  const checkIn = searchParams.get('checkIn');
  const checkOut = searchParams.get('checkOut');

  return {
    checkInDate: checkIn ? new Date(checkIn) : undefined,
    checkOutDate: checkOut ? new Date(checkOut) : undefined,
  };
};

export default useBookingSearchParams;