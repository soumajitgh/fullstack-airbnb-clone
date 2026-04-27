import { Listing } from '../../../../types/listing/listing.type.ts';
import { ListingCard } from '../../../../components/hosting/listing/listing-card.component.tsx';

function ListingSearchResultsComponent({ listings, checkInDate, checkOutDate }: {
  listings: Listing[],
  checkInDate: Date | undefined,
  checkOutDate: Date | undefined
}) {

  return (
    <div className={''}>
      <div className="mb-4">
        <p className={'font-semibold text-lg'}>{listings.length} places found</p>
      </div>

      <div className="grid grid-cols-2 gap-4 overflow-y-scroll max-h-[76vh] no-scrollbar rounded-xl">
        <>
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} openLinkInNewTab
                         to={`/listing/${listing.id}?checkIn=${checkInDate?.toISOString()}&checkOut=${checkOutDate?.toISOString()}`} />
          ))}
        </>
      </div>
    </div>

  );
}


export default ListingSearchResultsComponent;
