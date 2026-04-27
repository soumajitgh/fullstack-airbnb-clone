import { LatLngLiteral } from '../../../types/location.type.ts';
import { useQuery } from '@tanstack/react-query';

const useReverseGeoEncoding = (latLngLiteral: LatLngLiteral) => {
  const fetchingFunction = async () => {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latLngLiteral.lat},${latLngLiteral.lng}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&result_type=locality|sublocality|neighborhood|political`);
    return await response.json();
  };

  return useQuery({
    queryKey: ['reverse-geo-encoding'], queryFn: fetchingFunction,
  });
};

export default useReverseGeoEncoding;