import { useSearchParams } from 'react-router-dom';

const useSearchLocationParam = () => {
  const [searchParams] = useSearchParams();

  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  return {
    lat: lat ? parseFloat(lat) : undefined,
    lng: lng ? parseFloat(lng) : undefined,
  };
};

export default useSearchLocationParam;