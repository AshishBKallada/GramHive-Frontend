import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default marker icon issue with Leaflet
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const NearbyUsersMap = () => {
  const [position, setPosition] = useState([51.505, -0.09]); // Default position (London)
  const [users, setUsers] = useState([
    { name: 'John Doe', email: 'john@example.com', latitude: 51.505, longitude: -0.09 },
    { name: 'Jane Smith', email: 'jane@example.com', latitude: 51.515, longitude: -0.1 },
    { name: 'Sam Wilson', email: 'sam@example.com', latitude: 51.52, longitude: -0.12 },
    { name: 'Alice Johnson', email: 'alice@example.com', latitude: 51.53, longitude: -0.11 }
  ]);

  useEffect(() => {
    // Get current user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPosition([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }, []);

  return (
    <MapContainer center={position} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {users.map((user, idx) => (
        <Marker key={idx} position={[user.latitude, user.longitude]}>
          <Popup>
            {user.name}
            <br />
            {user.email}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default NearbyUsersMap;
