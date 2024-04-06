// export default MapContainer;
import React, { useState, useEffect } from 'react';

const GetPlaceName = () => {
  const [placeName, setPlaceName] = useState('');

  useEffect(() => {

    const latitude = 62.9141; // Example latitude
    const longitude = 74.8560; // Example longitude

    // Load the Google Maps JavaScript API script
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyC3RXRdq4Q5wONXbWMHAT92JZcXHdtmceE&libraries=places`;
    script.async = true;
    script.onload = () => {
      const geocoder = new window.google.maps.Geocoder();
      const latLng = new window.google.maps.LatLng(latitude, longitude);
      geocoder.geocode({ 'location': latLng }, (results, status) => {
        if (status === 'OK') {
          if (results[0]) {
            // Get the formatted address (name of the place)
            const placeName = results[0].formatted_address;
            setPlaceName(placeName);
          } else {
            console.error('No results found');
          }
        } else {
          console.error('Geocoder failed due to: ' + status);
        }
      });
    };

    // Append the script to the document body
    document.body.appendChild(script);

    // Clean up function to remove the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <h1>Place Name: {placeName}</h1>
    </div>
  );
};

export default GetPlaceName;
