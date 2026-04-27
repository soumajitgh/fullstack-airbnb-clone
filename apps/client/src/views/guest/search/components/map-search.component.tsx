import { AdvancedMarker, APIProvider, InfoWindow, Map } from '@vis.gl/react-google-maps';
import { Listing } from '../../../../types/listing/listing.type.ts';
import { LatLngLiteral } from '../../../../types/location.type.ts';
import { useState } from 'react';
import MapSearchListingCard from './map-search-listing-card.component.tsx';

export default function MapSearch(
  { centerCoordinates, filteredListing }: {
    centerCoordinates: LatLngLiteral,
    filteredListing: Listing[]
  }) {
  const [selectedListing, setSelectedListing] = useState<Listing | null>();

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <Map
        className={'rounded-lg h-[82vh]'}
        mapId={import.meta.env.VITE_GOOGLE_MAPS_MAP_ID}
        defaultCenter={centerCoordinates}
        defaultZoom={15}
        minZoom={12}
        maxZoom={18}
      >
        <>
          {selectedListing && (
            <InfoWindow
              className={'no-scrollbar overflow-x-hidden'}
              pixelOffset={[0, -28]}
              headerContent={
                <div className={'text-md'}>
                  <p>2.1 km away</p>
                </div>
              }
              position={{
                lat: parseFloat(String(selectedListing.location.lat)),
                lng: parseFloat(String(selectedListing.location.lng)),
              }}>
              <MapSearchListingCard listing={selectedListing} />
            </InfoWindow>
          )}

          {
            filteredListing.map((listing: Listing) => {
              return (
                <AdvancedMarker
                  key={listing.id}
                  onClick={() => {
                    setSelectedListing(listing);
                  }}
                  position={{
                    lat: parseFloat(String(listing.location.lat)),
                    lng: parseFloat(String(listing.location.lng)),
                  }}>
                  {
                    <div
                      className={'bg-white flex border-gray-600 border-2 hover:scale-110 rounded-full text-md font-bold p-2'}>
                      ${`${listing.costing}`}
                    </div>

                  }
                </AdvancedMarker>
              );
            })
          }
        </>
      </Map>
    </APIProvider>

  );
}