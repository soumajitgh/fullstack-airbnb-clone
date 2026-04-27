import { ListingCard } from '../../../components/hosting/listing/listing-card.component.tsx';
import { Listing } from '../../../types/listing/listing.type.ts';
import { Link } from 'react-router-dom';
import { useFetchMyListings } from '../../../hooks/api/listing/fetchListing.hook.ts';
import EmptyCard from '../../../components/common/cards/empty-card.component.tsx';

export default function MyListingsView() {

  const { isFetched, data } = useFetchMyListings();

  const fetchedListings = data?.data as Listing[];

  return isFetched && (
    <div className={'mt-4'}>
      <h3 className={'text-3xl font-bold mb-10'}>Your listings</h3>

      {fetchedListings.length === 0 && (
        <EmptyCard className={"h-96"}>
          <p>
            You have not created any listings yet. Click the button below to create your first listing.
          </p>
          <Link className={'btn btn-outline btn-ghost'} to={'/hosting/become-a-host'}>Create New Listing</Link>
        </EmptyCard>
      )}

      <div className={'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'}>
        {fetchedListings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} to={`/hosting/listing/${listing.id}`} />
        ))}
      </div>
    </div>
  );

}