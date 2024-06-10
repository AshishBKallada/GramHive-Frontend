import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { getUsersLocations } from "../../../services/services";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const createCustomIcon = (imageUrl) => {
  return new L.Icon({
    iconUrl: imageUrl,
    iconSize: [50, 50], // size of the icon
    iconAnchor: [25, 50], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -50], // point from which the popup should open relative to the iconAnchor
    className: 'custom-marker',
  });
};

const createLoggedUserIcon = () => {
  return new L.Icon({
    iconUrl: markerIcon,
    iconSize: [50, 50],
    iconAnchor: [25, 50],
    popupAnchor: [0, -50],
    className: 'logged-user-marker',
  });
};

const Map = () => {
  const [position, setPosition] = useState([51.505, -0.09]);
  const [users, setUsers] = useState([]);
  const [loggedUserLocation, setLoggedUserLocation] = useState(null);

  useEffect(() => {
    const getLocations = async () => {
      const { success, data, message } = await getUsersLocations();
      if (success) {
        console.log('User data', data);
        setUsers(data);
      } else {
        console.log(message);
      }
    };
    getLocations();
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPosition([position.coords.latitude, position.coords.longitude]);
          setLoggedUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }, []);

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {loggedUserLocation && (
        <Marker
          position={[loggedUserLocation.latitude, loggedUserLocation.longitude]}
          icon={createLoggedUserIcon()}
        >
          <Popup>
            You are here
          </Popup>
        </Marker>
      )}
      {users.map((user, idx) => (
        <Marker
          key={idx}
          position={[user.location?.latitude, user.location?.longitude]}
          icon={createCustomIcon(user.image || markerIcon)}
        >
          <Popup>
            <img src={user.image} alt={user.name} style={{ width: "50px", height: "50px", borderRadius: "50%" }} />
            <br />
            {user.name}
            <br />
            {user.email}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
