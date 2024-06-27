import React, { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

const ENDPOINT = "https://bassheads.shop";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {

  const [socket, setSocket] = useState(null);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const socketInstance = io(ENDPOINT);
    if (socketInstance) {
      setSocket(socketInstance);
    }
    return () => {
      socketInstance?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket && user) {
      const userId = user._id;
      socket.on("connect", () => {
        console.log("Connected to socket server");
      });

      socket.on("connected", () => {
        console.log("connection true");
      });

      socket.emit("setup", userId);
    }
  }, [socket, user]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
