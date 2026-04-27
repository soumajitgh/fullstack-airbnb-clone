import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactGoogleAutocomplete from 'react-google-autocomplete';
import useBookingSearchParams from '../../../../../hooks/search-params/useBookingSearchParams.hook.ts';

const recommendedDestinations = [
  { city: 'Ahmedabad', lat: 23.093498, lng: 72.641099 },
  { city: 'Goa', lat: 15.261954, lng: 74.100288 },
  { city: 'Hyderabad', lat: 17.473078, lng: 78.496801 },
  { city: 'Jaipur', lat: 26.90879, lng: 75.835846 },
  { city: 'Delhi', lat: 28.627592, lng: 77.296145 },
  { city: 'Shimla', lat: 31.145054, lng: 77.109696 },
  { city: 'Bangalore', lat: 12.985416, lng: 77.657641 },
  { city: 'Lucknow', lat: 26.835228, lng: 80.869594 },
  { city: 'Udaipur', lat: 24.593779, lng: 73.767683 },
  { city: 'Mumbai', lat: 19.131568, lng: 72.833618 },
  { city: 'Chennai', lat: 13.029772, lng: 80.266862 },
  { city: 'Pune', lat: 18.590658, lng: 73.762375 },
  { city: 'Kochi', lat: 9.873744, lng: 76.29619 },
  { city: 'Chandigarh', lat: 30.764551, lng: 76.813354 },
  { city: 'Kolkata', lat: 22.610109, lng: 88.40273 },
] as const;

type SearchInputs = {
  location: google.maps.places.PlaceResult,
  checkIn: Date,
  checkOut: Date,
};

export default function RootNavbarSearch() {

  const { checkInDate, checkOutDate } = useBookingSearchParams();

  const navigate = useNavigate();
  const routeLocation = useLocation();
  const isSearchPage = routeLocation.pathname === '/search';

  const { control, handleSubmit, watch } = useForm<SearchInputs>({
    defaultValues: {
      location: undefined,
      checkIn: checkInDate ? new Date(checkInDate) : undefined,
      checkOut: checkOutDate ? new Date(checkOutDate) : undefined,
    },
  });

  /**
   * Handles form submission.
   * @param data - The form data containing location, check-in, and check-out dates.
   */
  const onSubmit: SubmitHandler<SearchInputs> = (data) => {
    const { checkIn, checkOut, location } = data;

    const coordinates = location.geometry?.location;

    navigate(`/search?lat=${coordinates?.lat()}&lng=${coordinates?.lng()}&checkIn=${checkIn.toISOString()}&checkOut=${checkOut.toISOString()}`);

    if (isSearchPage) {
      window.location.reload();
    }
  };

  const navigateToRecommendation = (lat: number, lng: number) => {
    if (!checkInDate || !checkOutDate) {
      return;
    }

    navigate(`/search?lat=${lat}&lng=${lng}&checkIn=${checkInDate.toISOString()}&checkOut=${checkOutDate.toISOString()}`);
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <form className={'flex drop-shadow hover:drop-shadow-xl'} onSubmit={handleSubmit(onSubmit)}>

        <Controller
          control={control}
          name="location"
          render={({ field }) => (
            <ReactGoogleAutocomplete
              apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
              className="input  input-bordered w-56 rounded-l-full input-md bg-white rounded-r-none"
              placeholder={'Search Destinations'}
              options={{ types: ['locality', 'sublocality', 'landmark', 'street_address'] }}
              onPlaceSelected={(place) => {
                field.onChange(place);
              }}
            />
          )} />

        <Controller
          control={control}
          name="checkIn"
          render={({ field }) => (
            <DatePicker
              portalId={'checkInDatePicker'}
              dateFormat={'dd/MM/yyyy'}
              className="input input-bordered w-28 input-md bg-white rounded-none border-x-0"
              popperClassName={'z-50'}
              placeholderText={'Check In'}
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              selectsStart
              startDate={watch('checkIn')}
              endDate={watch('checkOut')}
            />)}
        />

        <Controller
          control={control}
          name="checkOut"
          render={({ field }) => (
            <DatePicker
              portalId={'checkOutDatePicker'}
              dateFormat={'dd/MM/yyyy'}
              className="input input-bordered w-28 input-md bg-white rounded-none"
              calendarClassName={'z-50'}
              popperClassName={'calender-popout'}
              placeholderText={'Check Out'}
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              selectsEnd
              startDate={watch('checkIn')}
              endDate={watch('checkOut')}
              minDate={watch('checkIn')}
            />)}
        />

        <button className={'btn btn-primary rounded-l-none rounded-r-full'} type={'submit'}><span
          className={'material-symbols-rounded'}>search</span>
        </button>
      </form>

      {isSearchPage && (
        <>
          <div className="flex max-w-4xl flex-wrap justify-center gap-2">
            {recommendedDestinations.map((destination) => (
              <button
                key={destination.city}
                className="btn btn-xs rounded-full border-base-300 bg-base-100 font-medium text-base-content hover:border-primary hover:text-primary"
                onClick={() => navigateToRecommendation(destination.lat, destination.lng)}
                type="button"
              >
                {destination.city}
              </button>
            ))}
          </div>

          <p className="text-center text-xs text-gray-500">
            Recommendations are based on seeded demo destinations in `scripts/seed/data.json`.
          </p>
        </>
      )}
    </div>
  );
}
