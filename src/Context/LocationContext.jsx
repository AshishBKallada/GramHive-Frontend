import React, { createContext, useContext, useEffect, useState } from "react";
import { updateUserLocation } from "../services/services";

const LocationContext = createContext();

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
};

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState({ lat: null, lng: null });

  const updateLocation = async () => {
    if (navigator.geolocation) {
      console.log("Navigator supports geolocation");
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          console.log("Position obtained");

          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });

          try {
            console.log("Attempting to update location...");
            await updateUserLocation({ latitude, longitude });
            console.log("Location updated successfully");
          } catch (error) {
            console.error("Error updating location:", error);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
        },
        {
          timeout: 10000,
          maximumAge: 60000,
          enableHighAccuracy: true,
        }
      );
    } else {
      console.log("Navigator does not support geolocation");
    }
  };

  useEffect(() => {
    updateLocation();
    const intervalId = setInterval(updateLocation, 600000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <LocationContext.Provider value={{ location }}>
      {children}
    </LocationContext.Provider>
  );
};
