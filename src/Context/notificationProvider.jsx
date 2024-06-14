import React, { createContext, useContext, useState } from "react";

export const NotificationContext = createContext([]);

const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (notification) => {
    console.log("notification", notification);
    setNotifications((prevNotifications) => [
      notification,
      ...prevNotifications,
    ]);
  };
  console.log("updated notification", notifications);

  const markNotificationAsRead = () => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) => ({ ...notification, read: true }))
    );
  };

  const removeNotification = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
  };

  const setStateNotifications = (data) => {
    setNotifications(data);
  };
  const getUnreadCount = () => {
    return notifications.filter((notification) => !notification.read).length;
  };

  const contextValue = {
    notifications,
    setStateNotifications,
    getUnreadCount,
    addNotification,
    markNotificationAsRead,
    removeNotification,
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationState = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotificationState must be used within a NotificationProvider"
    );
  }
  return context;
};

export default NotificationProvider;
