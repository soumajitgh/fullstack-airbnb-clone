import { RouteObject } from 'react-router-dom';
import DashboardView from '../views/guest/dashboard.view.tsx';
import SearchView from '../views/guest/search/search.view.tsx';
import ListingView from '../views/guest/listing/listing.view.tsx';
import MyBookingsView from '../views/guest/booking/my-bookings.view.tsx';
import BookingDetailsView from '../views/guest/booking/booking-details.view.tsx';


export const guestRoutes: RouteObject[] = [
  {
    path: '/',
    element: <DashboardView />,
  },
  {
    path: '/search',
    element: <SearchView />,
  },
  {
    path: 'listing/:listingId',
    element: <ListingView />,
  },
  {
    path: '/my-bookings',
    element: <MyBookingsView />,
  },
  {
    path: '/booking/:bookingId',
    element: <BookingDetailsView />,
  },
];