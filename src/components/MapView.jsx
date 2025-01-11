import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const MapView = ({ villages }) => {
  // Optional: choose a default center and zoom
  const defaultCenter = [31.5, 34.5]; // or pick something else
  const defaultZoom = 8;

  return (
    <MapContainer
      center={defaultCenter}
      zoom={defaultZoom}
      style={{ width: "100%", height: "400px" }}
      className="rounded-md border border-gray-600"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
      />
      
      {/* For each village, place a Marker */}
      {villages.map((village) => (
        <Marker
          key={village.id}
          position={[village.latitude, village.longitude]}
        >
          <Popup>
            <div>
              <strong>{village.name}</strong>
              <br />
              {village.region} {/* or any other info */}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;
