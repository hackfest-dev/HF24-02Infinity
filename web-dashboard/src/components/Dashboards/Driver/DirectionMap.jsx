import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import axios from 'axios';

const MapComponent = ({ apiKey, origin, destination }) => {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    const getRoutes = async () => {
      try {
        const response = await axios.get('https://maps.googleapis.com/maps/api/directions/json', {
          params: {
            origin,
            destination,
            key: apiKey
          }
        });
        setRoutes(response.data.routes);
      } catch (error) {
        console.error('Error fetching routes:', error);
      }
    };

    getRoutes();
  }, [apiKey, origin, destination]);

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: apiKey }}
        defaultCenter={{ lat: 0, lng: 0 }}
        defaultZoom={1}
      >
        {routes.map((route, index) => (
          <Polyline
            key={index}
            path={decodePolyline(route.overview_polyline.points)}
            options={{ strokeColor: '#FF0000' }}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
};

// Decode Google Maps polyline
function decodePolyline(encoded) {
  let index = 0;
  let lat = 0;
  let lng = 0;
  const coordinates = [];

  while (index < encoded.length) {
    let b;
    let shift = 0;
    let result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    const dlat = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
    lat += dlat;
    shift = 0;
    result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    const dlng = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
    lng += dlng;

    coordinates.push({ lat: lat / 1e5, lng: lng / 1e5 });
  }

  return coordinates;
}

export default MapComponent;
