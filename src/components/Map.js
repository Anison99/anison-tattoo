import React from 'react';
import GoogleMapReact from 'google-map-react';
import '../css/Map.css';

const MapMarker = () => <div className="map-marker">📍</div>; 

const Map = () => {
  const defaultProps = {
    center: {
      lat: 51.505,
      lng: -0.09,
    },
    zoom: 11,
  };

  return (
    <div className="map-container">
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'TWOJ_KLUCZ_API' }} 
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <MapMarker lat={51.505} lng={-0.09} />
      </GoogleMapReact>
    </div>
  );
};

export default Map;
