import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NotificationState } from "./Context/notificationProvider";
import { io } from "socket.io-client";

function SocketToast() {
  const userId = useSelector((state) => state.user._id);
  const ENDPOINT = "http://localhost:3000";
  const { addNotification } = NotificationState();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!socket && userId) {
      const newSocket = io(ENDPOINT);

      newSocket.on("connect", () => {
        console.log("User connected to socket");
        setSocket(newSocket);
        newSocket.emit("setup", userId);
      });

      newSocket.on("error", (error) => {
        console.error("Socket error:", error);
      });

      return () => {
        newSocket.disconnect();
      };
    }
    socket && socket.on("abcd", (data) => {
      const { notification } = data;
      console.log("Notification received:", notification);
      addNotification(notification);
    });
  }, [socket, userId, addNotification, ENDPOINT]);

  return <div></div>;
}

export default SocketToast;
