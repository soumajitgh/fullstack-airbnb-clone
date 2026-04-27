import { Listing } from '../../../types/listing/listing.type.ts';
import { Link } from 'react-router-dom';
import ListingImageCarousel from './listing-image-carousel.component.tsx';
import { isBookingReserved } from '../../../utils/booking.util.ts';
import useBookingSearchParams from '../../../hooks/search-params/useBookingSearchParams.hook.ts';

type ListingCardProps = { listing: Listing, to: string, openLinkInNewTab?: boolean }

export function ListingCard({ listing, to, openLinkInNewTab = false }: ListingCardProps) {
  const { title, costing, images } = listing;

  const { checkInDate, checkOutDate } = useBookingSearchParams();

  const isListingBooked = isBookingReserved(checkInDate!, checkOutDate!, listing.bookings);

  return (
    <Link to={to} target={openLinkInNewTab ? '_blank' : undefined}>
      <div className={'flex flex-col gap-2 animate-fade-in rounded-xl'}>

        {/*image carousel*/}
        <div className={isListingBooked ? 'grayscale' : ''}>
          {
            isListingBooked && (
              <div
                className={'absolute top-0 left-0 w-full justify-center flex items-center h-full'}>
                <p className={'text-white font-semibold text-lg bg-black px-4 py-2 rounded'}>Already Booked</p>
              </div>
            )
          }
          <ListingImageCarousel listingImages={images} />
        </div>

        <div className="flex flex-col gap-0.5">
          <h6 className={'font-semibold text-lg'}>{title}</h6>
          <p className={'text-sm text-gray-500'}>${costing} per night</p>
        </div>

      </div>
    </Link>

  );
}