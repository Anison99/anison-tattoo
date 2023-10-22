import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../css/Map.css';

const MapMarker = () => <div className="map-marker">📍</div>;

const Map = () => {
  useEffect(() => {
    // Inicjalizacja mapy
    const map = L.map('map').setView([51.505, -0.09], 11);

    // Dodaj warstwę mapy OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    // Dodaj marker
    L.marker([51.505, -0.09], { icon: L.divIcon({ className: 'custom-marker' }) }).addTo(map);
  }, []);

  return <div id="map" className="map-container" />;
};

export default Map;
