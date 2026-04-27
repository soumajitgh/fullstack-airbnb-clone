import { RouteObject } from 'react-router-dom';
import CreateListingView from '../views/hosting/listing/create-listing.view.tsx';
import MyListingsView from '../views/hosting/listing/my-listings.view.tsx';
import HostingListingView from '../views/hosting/listing/hosting-listing.view.tsx';
import MyHostingReservations from '../views/hosting/reservations/my-hosting-reservations.view.tsx';

const hostingRoutes: RouteObject[] = [
  {
    path: 'reservations',
    element: <MyHostingReservations />,
    index: true
  },
  {
    path: 'become-a-host',
    element: <CreateListingView />,
  },
  {
    path: 'listings',
    element: <MyListingsView />,
  },
  {
    path: 'listing/:listingId',
    element: <HostingListingView />,
  },
];

export default hostingRoutes;