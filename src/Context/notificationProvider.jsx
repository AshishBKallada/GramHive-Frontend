import { createContext, useContext } from "react";

export const NotificationContext = createContext([]);

const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState();

  const addNotification = (notification) => {
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      notification,
    ]);
  };

  const markNotificationAsRead = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const removeNotification = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
  };

  const contextValue = {
    notifications,
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
export const NotificationState = () => {
  return useContext(NotificationContext);
};

export default NotificationProvider;
