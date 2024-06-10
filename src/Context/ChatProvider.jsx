import { createContext, useContext, useState } from "react";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [chats, setChats] = useState([]);
  const [notifictaions ,setNotifications] = useState([]);

  return (
    <ChatContext.Provider
      value={{ chats, setChats, selectedChat, setSelectedChat, notifictaions, setNotifications}}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};
export default ChatProvider;
