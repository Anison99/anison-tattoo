import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../css/Map.css';

const Map = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) {
      // Inicjalizacja mapy tylko jeśli jeszcze nie została zainicjalizowana
      const map = L.map('map').setView([50.0128, 20.9889], 13); // Ustaw współrzędne Tarnowa i poziom zbliżenia
      mapRef.current = map;

      // Dodaj warstwę mapy OpenStreetMap
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

      // Dodaj znacznik na mapie
      const marker = L.marker([50.0128, 20.9889]).addTo(map); // Ustaw współrzędne dla znacznika
      marker.bindPopup('Lokalizacja: Rynek 1');
    }
  }, []);

  return <div id="map" className="map-container" />;
};

export default Map;
