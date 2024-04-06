import React, { useState, useRef } from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

const MapContainer = ({ source, destination }) => {
  const [directions, setDirections] = useState(null);
  const mapRef = useRef(null);

  const directionsCallback = (response, status) => {
    if (status === 'OK') {
      setDirections(response);
    } else {
      console.error('Directions request failed due to ', status);
    }
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyC3RXRdq4Q5wONXbWMHAT92JZcXHdtmceE"
      libraries={['places']}
    >
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%' }}
        zoom={10}
        center={source}
        onLoad={map => mapRef.current = map}
      >
        {/* Here you are rendering DirectionsRenderer based on directions state */}
        {directions && <DirectionsRenderer directions={directions} />}
        
        {/* Here you are making a DirectionsService request */}
        {source && destination && (
          <DirectionsService
            options={{
              destination: destination,
              origin: source,
              travelMode: 'DRIVING'
            }}
            callback={directionsCallback}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapContainer;
