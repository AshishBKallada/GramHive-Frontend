import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { ChatState } from "../../../Context/ChatProvider";
import {
  getMessages,
  messageDelete,
  sentMessage,
} from "../../../services/services";
import { useSelector } from "react-redux";
import {
  getSender,
  getSenderId,
  getSenderImage,
  isLastMessage,
  isSameSender,
} from "../../../Config/ChatLogics";
import { useToast } from "@chakra-ui/react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";

import { ZIM } from "zego-zim-web";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import MyDropzone from "./DropZone";
import { useReportUser } from "../../../Functions/reportsHooks/reportUserHook";

const Chat = () => {
  const { selectedChat, notifications, setNotifications } = ChatState();
  const messagesEndRef = useRef(null);
  const toast = useToast();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState(null);
  const [socketConn, setSocketConn] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [zp, setZp] = useState(null);

  const [enableCall, setEnableCall] = useState(false);

  const userId = useSelector((state) => state.user.user._id);

  const ENDPOINT = "http://localhost:3000";
  var socket, selectedChatCompare;
  console.log("notifications", notifications);

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", userId);
    socket.on("connected", () => setSocketConn(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));

    socket.on("message received", (newMessage) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessage.chat._id
      ) {
      } else {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    });

    socket.on("notification received", (notification) => {
      console.log(notification);
      const isChatOpen = selectedChat?.users?.some(
        (user) => user._id === notification.senderId
      );

      if (isChatOpen) {
        console.log("Chat Open");
        setNotifications((prev) => [
          { ...notification, isRead: true },
          ...prev,
        ]);
      } else {
        console.log("Chat not open");
        setNotifications((prev) => [notification, ...prev]);
      }
    });
  });

  console.log("selectedChat", selectedChat);

  useEffect(() => {
    const fetchMessages = async () => {
      const { data } = await getMessages(selectedChat._id);
      setMessages(data);
      socket.emit("join chat", selectedChat._id);
    };
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSentMessage = async () => {
    try {
      socket.emit("stop typing", selectedChat._id);
      const { data } = await sentMessage(selectedChat._id, message);
      console.log("DATA RECEIVED", data);
      setMessage("");
      socket.emit("new message", data);
      setMessages([...messages, data]);
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to create group ${groupName}`,
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const typingHandler = (e) => {
    setMessage(e.target.value);

    if (!socketConn) return;
    if (!typing) {
      setTyping(true);

      socket.emit("typing", selectedChat._id);
    }

    var lastTypingTime = new Date().getTime();
    var timerLength = 1000;

    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  useEffect(() => {
    const initZego = async () => {
      const appID = 936448743;
      const serverSecret = "494beec4b3a9c89f5408d65b260c8b71";
      const TOKEN = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        null,
        userId,
        `userName${userId}`
      );

      const zegoInstance = ZegoUIKitPrebuilt.create(TOKEN);
      zegoInstance.addPlugins({ ZIM });

      setZp(zegoInstance);
    };

    initZego();

    return () => {
      if (zp) {
        zp.destroy();
      }
    };
  }, [userId]);

  async function invite() {
    const targetUser = {
      userID: getSenderId(userId, selectedChat.users),
      userName: getSender(userId, selectedChat.users),
      image: getSenderImage(userId, selectedChat.users),
    };
    zp.sendCallInvitation({
      callees: [targetUser],
      callType: ZegoUIKitPrebuilt.InvitationTypeVideoCall,
      timeout: 60,
    })
      .then((res) => {
        console.warn(res);
      })
      .catch((err) => {
        console.warn(err);
      });
  }

  const handleCall = () => {
    setEnableCall(true);
    invite();
  };

  const handleMessageDelete = async (messageId) => {
    const response = await messageDelete(messageId);
    if (response.data.success) {
      toast({
        description: `message deleted`,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      setMessages((prev) =>
        prev.filter((message) => message._id !== messageId)
      );
    } else {
      toast({
        description: `Failed to delete message`,
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const reportuser = useReportUser();
  const handleReportUser = () => {
    const userToReport = getSenderId(userId, selectedChat.users);
    reportuser(userToReport);
  };
  console.log("MESSAGEA|", messages);

  if (!selectedChat) {
    return (
      <>
        <div class="mt-14 mr-12 ml-6 relative py-3 px-3 bg-teal-200 no-chat-selected rounded-3xl">
          <img
            className="w-88 h-88 object-cover rounded-lg"
            src="https://actionmarketingco.com/wp-content/uploads/2022/12/how-Chatbot-can-help-grow-your-business.png"
            alt=""
          />
          {/* <div class="absolute top-2/3 left-1/2 transform -translate-y-1/2 -translate-x-1/2 text-gray-300 text-3xl text-center font-bold">
            Select a chat to start messaging !
          </div> */}
        </div>
      </>
    );
  }
  return (
    <>
      <script src="https://unpkg.com/zego-zim-web@2.5.0/index.js"></script>
      <script src="https://unpkg.com/@zegocloud/zego-uikit-prebuilt/zego-uikit-prebuilt.js"></script>
      <div className="bg-gray-100">
        <div className="py-2 px-3 bg-grey-lighter flex flex-row justify-between items-center bg-teal-500">
          <div className="flex items-center">
            <div>
              <img
                className="w-10 h-10 rounded-full"
                src={getSenderImage(userId, selectedChat.users)}
                alt="Expendables 4"
              />
            </div>
            <div className="ml-4">
              <p className="text-white">
                {" "}
                {!selectedChat.isGroupChat
                  ? getSender(userId, selectedChat.users)
                  : selectedChat.latestMessage?.sender.username}
              </p>
              <p className="text-grey-darker text-xs mt-1">
                Andrés, Tom, Harrison, Arnold, Sylvester
              </p>
            </div>
          </div>

          <div className="flex">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path
                  fill="#263238"
                  fillOpacity=".5"
                  d="M15.9 14.3H15l-.3-.3c1-1.1 1.6-2.7 1.6-4.3 0-3.7-3-6.7-6.7-6.7S3 6 3 9.7s3 6.7 6.7 6.7c1.6 0 3.2-.6 4.3-1.6l.3.3v.8l5.1 5.1 1.5-1.5-5-5.2zm-6.2 0c-2.6 0-4.6-2.1-4.6-4.6s2.1-4.6 4.6-4.6 4.6 2.1 4.6 4.6-2 4.6-4.6 4.6z"
                ></path>
              </svg>
            </div>
            <div className="ml-6">
              <button onClick={handleCall}>
                <img
                  className="w-6 h-6"
                  src="https://w7.pngwing.com/pngs/811/53/png-transparent-phone-contact-icon-logo-iphone-computer-icons-telephone-call-phone-icon-electronics-text-grass-thumbnail.png"
                  alt=""
                />
              </button>
            </div>
            <div className="ml-6">
              <Menu>
                <MenuHandler>
                  <Button className="bg-teal-500  text-white">...</Button>
                </MenuHandler>
                <MenuList>
                  <MenuItem>Share</MenuItem>
                  <MenuItem>Block</MenuItem>
                  <MenuItem onClick={handleReportUser}>Report</MenuItem>
                </MenuList>
              </Menu>
            </div>
          </div>
        </div>
        <div
          className="flex-1  mt-4 bg-gray-200"
          style={{
            overflowY: "scroll",
            minHeight: "600px",
            maxHeight: "600px",
            backgroundImage:
              "url(https://w0.peakpx.com/wallpaper/818/148/HD-wallpaper-whatsapp-background-cool-dark-green-new-theme-whatsapp.jpg)",
            backgroundSize: "cover",
          }}
        >
          {messages &&
            messages.map((message, i) => {
              return (
                <div className="h-full">
                  {message.sender._id !== userId ? (
                    <div className="ml-2 grid ">
                      <div class="flex gap-2.5">
                        {(isSameSender(messages, message, i, userId) ||
                          isLastMessage(messages, i, userId)) && (
                          <img
                            src={message.sender.image}
                            alt="Shanay image"
                            className="w-10 h-10 rounded-full"
                          />
                        )}
                        <div class="grid">
                          <h5 class="text-gray-900 text-sm font-semibold leading-snug pb-1">
                            {message.sender.username}
                          </h5>
                          <div class="w-max grid">
                            <div class="px-3.5 py-2 bg-gray-100 rounded justify-start  items-center gap-3 inline-flex">
                              <h5 class="text-gray-900 text-sm font-normal leading-snug">
                                {message.content}
                              </h5>
                            </div>
                            <div className="relative mt-4 h-32 mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
  {message.sharedPost?.images[0] && (
    <img
      src={message.sharedPost.images[0]}
      alt="card-image"
      className="w-full h-full object-cover"
    />
  )}
  {message.sharedPost?.images.length > 1 && (
    <div className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full px-2 py-1 text-xs font-semibold">
      +{message.sharedPost.images.length - 1}
    </div>
  )}
</div>

                            <div class="justify-end items-center inline-flex mb-2.5">
                              <h6 class="text-gray-500 text-xs font-normal leading-4 py-1">
                                {new Date(message.createdAt).toLocaleString()}
                              </h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div class="flex gap-2.5 justify-end">
                      <div class="relative group">
                        <div class="justify-center">
                          <div class="grid w-fit ml-auto">
                            <button
                              onClick={() => handleMessageDelete(message._id)}
                              class="absolute left-0 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 512 512"
                                id="trash"
                              >
                                <path d="M413.7 133.4c-2.4-9-4-14-4-14-2.6-9.3-9.2-9.3-19-10.9l-53.1-6.7c-6.6-1.1-6.6-1.1-9.2-6.8-8.7-19.6-11.4-31-20.9-31h-103c-9.5 0-12.1 11.4-20.8 31.1-2.6 5.6-2.6 5.6-9.2 6.8l-53.2 6.7c-9.7 1.6-16.7 2.5-19.3 11.8 0 0-1.2 4.1-3.7 13-3.2 11.9-4.5 10.6 6.5 10.6h302.4c11 .1 9.8 1.3 6.5-10.6zM379.4 176H132.6c-16.6 0-17.4 2.2-16.4 14.7l18.7 242.6c1.6 12.3 2.8 14.8 17.5 14.8h207.2c14.7 0 15.9-2.5 17.5-14.8l18.7-242.6c1-12.6.2-14.7-16.4-14.7z"></path>
                              </svg>
                            </button>
                            <div class="px-3 py-2 bg-indigo-600 rounded group-hover:ml-8 transition-all duration-200">
                              <h2 class="text-white text-sm font-normal leading-snug">
                                {message.content}
                              </h2>
                            </div>
                            <div className="relative mt-4 h-32 mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
  {message.sharedPost?.images[0] && (
    <img
      src={message.sharedPost.images[0]}
      alt="card-image"
      className="w-full h-full object-cover"
    />
  )}
  {message.sharedPost?.images.length > 1 && (
    <div className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full px-2 py-1 text-xs font-semibold">
      +{message.sharedPost.images.length - 1}
    </div>
  )}
</div>


                            <div class="justify-start items-center inline-flex">
                              <h3 class="text-gray-500 text-xs font-normal leading-4 py-1">
                                {new Date(message.createdAt).toLocaleString()}
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>

                      <img
                        src={message.sender.image}
                        alt="Hailey image"
                        className="w-10 h-10 rounded-full"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          <div ref={messagesEndRef} />
        </div>
        {isTyping ? <p>typing... </p> : null}
        <div class="w-full pl-3 pr-1 py-1 rounded-3xl border-4 border-teal-300 items-center gap-2 inline-flex justify-between mt-0">
          <div class="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
            >
              <g id="User Circle">
                <path
                  id="icon"
                  d="M6.05 17.6C6.05 15.3218 8.26619 13.475 11 13.475C13.7338 13.475 15.95 15.3218 15.95 17.6M13.475 8.525C13.475 9.89191 12.3669 11 11 11C9.6331 11 8.525 9.89191 8.525 8.525C8.525 7.1581 9.6331 6.05 11 6.05C12.3669 6.05 13.475 7.1581 13.475 8.525ZM19.25 11C19.25 15.5563 15.5563 19.25 11 19.25C6.44365 19.25 2.75 15.5563 2.75 11C2.75 6.44365 6.44365 2.75 11 2.75C15.5563 2.75 19.25 6.44365 19.25 11Z"
                  stroke="teal"
                  stroke-width="1.6"
                />
              </g>
            </svg>
            <input
              onChange={typingHandler}
              value={message}
              class="grow shrink basis-0 text-black text-xs font-medium leading-4 focus:outline-non "
              placeholder="Type here..."
            />
          </div>
          <div class="flex items-center gap-2">
            <MyDropzone />

            <button
              onClick={handleSentMessage}
              class="items-center flex px-3 py-2 bg-teal-600 rounded-full shadow "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <g id="Send 01">
                  <path
                    id="icon"
                    d="M9.04071 6.959L6.54227 9.45744M6.89902 10.0724L7.03391 10.3054C8.31034 12.5102 8.94855 13.6125 9.80584 13.5252C10.6631 13.4379 11.0659 12.2295 11.8715 9.81261L13.0272 6.34566C13.7631 4.13794 14.1311 3.03408 13.5484 2.45139C12.9657 1.8687 11.8618 2.23666 9.65409 2.97257L6.18714 4.12822C3.77029 4.93383 2.56187 5.33664 2.47454 6.19392C2.38721 7.0512 3.48957 7.68941 5.69431 8.96584L5.92731 9.10074C6.23326 9.27786 6.38623 9.36643 6.50978 9.48998C6.63333 9.61352 6.72189 9.7665 6.89902 10.0724Z"
                    stroke="white"
                    stroke-width="1.6"
                    stroke-linecap="round"
                  />
                </g>
              </svg>
              <h3 class="text-white text-xs font-semibold leading-4 px-2">
                Send
              </h3>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
