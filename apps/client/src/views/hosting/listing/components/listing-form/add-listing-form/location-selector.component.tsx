import React from 'react';
import { LatLngLiteral } from '../../../../../../types/location.type.ts';
import ReactGoogleAutocomplete from 'react-google-autocomplete';
import { AdvancedMarker, APIProvider, Map } from '@vis.gl/react-google-maps';

type LocationSelectorInputProps = {
  location: LatLngLiteral | null;
  setLocation: React.Dispatch<React.SetStateAction<LatLngLiteral | null>>;
}

export default function LocationSelectorInput({ location, setLocation }: LocationSelectorInputProps) {

  return (
    <div className={'grid grid-cols-2 gap-4'}>
      <div className={'flex flex-col gap-4 w-full'}>
        <ReactGoogleAutocomplete
          apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
          className={'input input-bordered w-full'}
          options={{ types: ['locality', 'sublocality', 'landmark', 'street_address'] }}
          onPlaceSelected={(place) => {
            setLocation({
              lat: place.geometry?.location?.lat() || 0,
              lng: place.geometry?.location?.lng() || 0,
            });
          }}
        />

        {location ? (
          <div className={'flex flex-col gap-2'}>
            <h5 className={'text-xl font-semibold'}>Selected Location</h5>
            <p className={'text-gray-500'}>
              Latitude: {location.lat},<br /> Longitude: {location.lng}
            </p>
          </div>
        ) : (
          <div>
            <h5 className={'text-xl font-semibold'}>Quick Tip</h5>
            <p className={'text-gray-500'}>
              Type a location in the input field to select a location on the map
            </p>
          </div>
        )}
      </div>


      {
        location ? (
          <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
            <Map mapId={import.meta.env.VITE_GOOGLE_MAPS_MAP_ID}
                 className={'aspect-video'}
                 defaultCenter={location}
                 defaultZoom={15}
            >
              <AdvancedMarker
                draggable={true}
                onDragEnd={(event) => {
                  setLocation({
                    lat: event.latLng?.lat() || 0,
                    lng: event.latLng?.lng() || 0,
                  });
                }}
                position={location}
              />
            </Map>
          </APIProvider>
        ) : (
          <div className={'aspect-video bg-base-200 rounded-xl flex justify-center items-center'}>
            <p className={'text-gray-500 font-bold'}>
              Please type a location in the input field to select a location on the map
            </p>
          </div>
        )
      }

      {/*{*/
      }
      {/*  location && (*/
      }
      {/*    <GoogleMap center={location} zoom={17}*/
      }
      {/*               mapContainerClassName={'width-full h-80 rounded-lg'}*/
      }
      {/*               options={{ streetViewControl: false, mapTypeControl: false, clickableIcons: false }}*/
      }
      {/*               onLoad={(map) => {*/
      }
      {/*                 mapRef.current = map;*/
      }
      {/*               }}*/
      }
      {/*               onClick={(mapsClickEvent) => {*/
      }
      {/*                 setLocation({*/
      }
      {/*                   lat: mapsClickEvent.latLng?.lat() || 0,*/
      }
      {/*                   lng: mapsClickEvent.latLng?.lng() || 0,*/
      }
      {/*                 });*/
      }
      {/*                 mapRef.current?.panTo(location);*/
      }
      {/*               }}>*/
      }


      {/*      <MarkerF position={location} onDrag={(event) => {*/
      }
      {/*        setLocation({*/
      }
      {/*          lat: event.latLng?.lat() || 0,*/
      }
      {/*          lng: event.latLng?.lng() || 0,*/
      }
      {/*        });*/
      }
      {/*      }} />*/
      }
      {/*    </GoogleMap>*/
      }
      {/*  )*/
      }
      {/*}*/
      }

    </div>
  )
    ;
}