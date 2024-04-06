import React from 'react';

const MapComponent = () => {
  return (
    <iframe
      src="https://storage.googleapis.com/maps-solutions-rysxbkgbbh/commutes/7spw/commutes.html"
      width="1300px" 
      height="600px" 
      style={{ border: '0' }}
      loading="lazy"
    />
  );
};

export default MapComponent;
