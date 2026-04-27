import { Listing } from '../../../types/listing/listing.type.ts';
import MapSearch from './components/map-search.component.tsx';
import { APIProvider } from '@vis.gl/react-google-maps';
import ListingSearchResultsComponent from './components/listing-search-results.component.tsx';
import useSearchLocationParam from '../../../hooks/search-params/useSearchLocationParams.hook.ts';
import { useEffect } from 'react';
import useBookingSearchParams from '../../../hooks/search-params/useBookingSearchParams.hook.ts';
import { useFetchSearchListings } from '../../../hooks/api/listing/fetchListing.hook.ts';
import EmptyCard from '../../../components/common/cards/empty-card.component.tsx';

export default function SearchView() {
  const { lat, lng } = useSearchLocationParam();
  const { checkInDate, checkOutDate } = useBookingSearchParams();

  useEffect(() => {
    if (!lat || !lng) {
      throw Error('Missing location. Please search for a location');
    }

    if (!checkInDate || !checkOutDate) {
      throw Error('Missing check in or check out date');
    }
  }, [lat, lng, checkInDate, checkOutDate]);

  const { isFetched, isError, data } = useFetchSearchListings({
    lat: lat!,
    lng: lng!,
    searchRadius: 20,
  });
  const listings = data?.data as Listing[];

  if (isError) {
    throw Error('Failed to search listings');
  }

  if (isFetched && listings.length <= 0) {
    return (
      <EmptyCard className={'h-96'}>
        <p>No Listings found. Try searching for other locations</p>
      </EmptyCard>
    );
  }

  return (
    isFetched && (
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <div className={'grid grid-cols-2 gap-4 mt-2'}>
          <ListingSearchResultsComponent listings={listings}
                                         checkOutDate={checkOutDate}
                                         checkInDate={checkInDate} />

          <MapSearch centerCoordinates={{ lat: lat!, lng: lng! }} filteredListing={listings} />
        </div>
      </APIProvider>
    )
  );
}
