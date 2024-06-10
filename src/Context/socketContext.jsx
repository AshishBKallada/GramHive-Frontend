import React, { createContext, useState, useEffect } from "react";
import io from "socket.io-client";

const ENDPOINT = "http://localhost:3000";

export const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:3000");
    newSocket.on('connect',()=>console.log('Connected'))
    setSocket(newSocket);

    return () => newSocket.disconnect();
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
