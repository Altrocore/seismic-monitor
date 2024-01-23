import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, GeoJSON } from 'react-leaflet';
import L from 'leaflet';

const SeismicMap = ({ events }) => {
  const getMarkerRadius = (magnitude) => {
      const baseRadius = 3;
      return baseRadius * magnitude;
  };
  const [plateBoundaries, setPlateBoundaries] = useState(null);

  useEffect(() => {
    fetch('PB2002_boundaries.json')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setPlateBoundaries(data);
        })
        .catch(error => console.error('Error loading GeoJSON:', error));
  }, []);

  const bounds = L.latLngBounds(
    L.latLng(-90, -180),
    L.latLng(90, 180)
  );

  const onEachFeature = (feature, layer) => {
    if (feature.properties && feature.properties.Name) {
      layer.bindPopup(feature.properties.Name);
    }
  };

  const geoJsonStyle = {
    color: 'blue',
    weight: 2,   
    opacity: 0.65 
  };

  return (
    <MapContainer 
      center={[0, 0]} 
      zoom={2} 
      style={{ height: '600px', width: '100%' }}
      minZoom={2} 
      maxBounds={bounds} 
      worldCopyJump={true}
      maxBoundsViscosity={1.0}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {plateBoundaries && (
        <GeoJSON 
          data={plateBoundaries} 
          style={geoJsonStyle} 
          onEachFeature={onEachFeature}
        />
      )}
      {events.map((event, index) => (
        <CircleMarker 
          key={index} 
          center={[event.ev_latitude, event.ev_longitude]}
          radius={getMarkerRadius(event.ev_mag_value)} 
          fillColor="red"
          color="red"
        >
          <Popup>
            A seismic event occurred here with magnitude: {event.ev_mag_value}
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
};

export default SeismicMap;
