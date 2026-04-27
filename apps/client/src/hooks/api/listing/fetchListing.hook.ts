import { SearchListingsDto } from './dto/listing.dto.ts';
import useAxiosPrivate from '../../auth/useAxiosPrivate.ts';
import { useQuery } from '@tanstack/react-query';

const URLS = {
  fetchListings: 'listing',
  fetchListingByID: (listingId: string) => `listing/${listingId}`,
  searchListings: 'listing/search',
  newListings: 'listing/new',
};

export const useFetchSearchListings = (searchListingDto: SearchListingsDto) => {
  const axiosPrivateInstance = useAxiosPrivate();

  return useQuery({
    queryKey: ['search'],
    queryFn: () => (axiosPrivateInstance.get(URLS.searchListings, { params: searchListingDto })),
  });
};

export const useFetchMyListings = () => {
  const axiosPrivateInstance = useAxiosPrivate();

  return useQuery({
    queryKey: ['my-listings'],
    queryFn: () => (axiosPrivateInstance.get(URLS.fetchListings)),
  });
};

export const useFetchListingByID = (listingId: string) => {
  const axiosPrivateInstance = useAxiosPrivate();

  return useQuery({
    queryKey: ['listing'],
    queryFn: () => axiosPrivateInstance.get(URLS.fetchListingByID(listingId)),
  });
};