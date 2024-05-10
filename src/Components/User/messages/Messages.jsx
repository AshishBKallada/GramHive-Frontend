import React, { useEffect, useState } from "react";
import {
  accessChat,
  fetchUserChats,
  searchUser,
} from "../../../services/services";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../../../Context/ChatProvider";
import { useSelector } from "react-redux";
import { getSender, getSenderImage } from "../../../Config/ChatLogics";

function MessageList() {
  const toast = useToast();
  const navigate = useNavigate();

  const [isOpen, setIsModalOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const [isGroupOpen, setGroupModal] = useState(false);
  const [members, setMembers] = useState([]);
  const [query, setQuery] = useState(null);
  const [groupName, setGroupName] = useState(null);

  const userId = useSelector((state) => state.user.user._id);
  const { selectedChat, setSelectedChat, chats, setChats } = ChatState();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const { data } = await fetchUserChats(userId);
        console.log("Chats fetched", data);
        setChats(data);
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };

    fetchChats();
  }, []);

  const onClose = () => {
    setIsModalOpen(false);
  };

  const handleSearch = async (e) => {
    const filter = e.target.value;
    if (filter.trim() !== "") {
      setLoading(true);
      setQuery(filter);
      const { data } = await searchUser(filter);
      setSearchResults(data);
      setLoading(false);
    } else {
      setSearchResults([]);
      setQuery(null);
    }
  };

  const handleAddToGroup = (userId) => {
    setMembers([...members, userId]);
  };

  const handleRemoveFromGroup = (userId) => {
    setMembers(members.filter((memberId) => memberId !== userId));
  };

  const handleCreateGroup = async () => {
    if (!groupName) {
      toast({
        title: "Error",
        description: "Enter a group name to continue.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    if (members.length < 1) {
      toast({
        title: "Error",
        description: "Add atleast one member",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    try {
      // const response = await createChatGroup(
      //   groupName,
      //   members.map((member) => member._id)
      // );
      toast({
        title: "Success",
        description: `Created group ${groupName}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setMembers(null);
      setQuery(null);
      setGroupName(null);
      setGroupModal(false);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: `Failed to create group ${groupName}`,
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      setGroupModal(false);
    }
  };

  const handleSearchAppend = async (userId2) => {
    try {
      const { data } = await accessChat(userId2);
      console.log("DATA", data);
      // if (!chats.find((chat) => chat._id === data._id)) {
      //   setChats([data, ...chats]);
      // }
      setSelectedChat(data);
      console.log(chats, "after appending");
      onClose();
    } catch (error) {}
  };

  return (
    <>
      {/* CreateGroup */}

      <div
        className={`fixed inset-0 z-50 overflow-y-auto flex items-center justify-center ${
          isGroupOpen ? "visible" : "invisible"
        }`}
      >
        <div className="bg-white rounded-md shadow-xl max-w-md w-full p-6 sm:w-96 md:w-1/2 lg:w-2/3 xl:w-1/3">
          <div className="bg-indigo-500 text-white px-4 py-2 flex justify-between rounded-t-md">
            <h2 className="text-lg font-semibold">Create Group</h2>
            <button className="text-white" onClick={() => setGroupModal(false)}>
              &times;
            </button>
          </div>
          <div className="p-4">
            <input
              onChange={(e) => setGroupName(e.target.value)}
              type="text"
              placeholder="Enter a group name"
              className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
            />

            <h2 className="text-xl font-semibold text-blue-gray-900 mb-4">
              Add Members ...
            </h2>

            {/* Search Box */}
            <input
              onChange={(e) => handleSearch(e)}
              type="text"
              value={query}
              placeholder="Search..."
              className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
            />

            {/* Scrollable Div */}
            <div className="h-60 overflow-y-auto border border-gray-200 rounded-md p-4">
              {!query && members && members.length > 0
                ? members.map((member) => (
                    <div className="user-row flex items-center justify-between p-2 duration-300 sm:flex-row sm:py-2 sm:px-4 hover:bg-teal-100 transform hover:scale-105">
                      <div className="user flex items-center text-center flex-col sm:flex-row sm:text-left">
                        <div className="avatar-content mb-1 sm:mb-0 sm:mr-2">
                          <img
                            className="avatar w-16 h-16 rounded-full"
                            src={member.image.toString()}
                            alt=""
                          />
                        </div>
                        <div className="user-body flex flex-col mb-2 sm:mb-0 sm:mr-2">
                          <a
                            href="#"
                            className="title font-medium no-underline"
                          >
                            {member.username}
                          </a>
                          <div className="skills flex flex-col">
                            <span className="subtitle text-slate-500">
                              {member.name}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-end">
                        <button>
                          {members.find((m) => m._id === member._id) ? (
                            <img
                              onClick={() => handleRemoveFromGroup(member)}
                              className="w-10 h-10 rounded-full"
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyaAee26mOCJ4ugx_Fs0QprRd6RcXrU2KBjWoScmTKmw&s"
                              alt=""
                            />
                          ) : (
                            <img
                              onClick={() => handleAddToGroup(member)}
                              className="w-10 h-10 rounded-full"
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0JpizWgT7g4Wleker4p6TXVxmfIKclxZRA3ng9Y5tQy_1PnhEY6OyGp4nNoK8pggQIY0&usqp=CAU"
                              alt=""
                            />
                          )}
                        </button>
                      </div>
                    </div>
                  ))
                : searchResults.map((user, index) => (
                    <div className="user-row flex items-center justify-between p-2 duration-300 sm:flex-row sm:py-2 sm:px-4 hover:bg-teal-100 transform hover:scale-105">
                      <div className="user flex items-center text-center flex-col sm:flex-row sm:text-left">
                        <div className="avatar-content mb-1 sm:mb-0 sm:mr-2">
                          <img
                            className="avatar w-16 h-16 rounded-full"
                            src={user.image.toString()}
                            alt=""
                          />
                        </div>
                        <div className="user-body flex flex-col mb-2 sm:mb-0 sm:mr-2">
                          <a
                            href="#"
                            className="title font-medium no-underline"
                          >
                            {user.username}
                          </a>
                          <div className="skills flex flex-col">
                            <span className="subtitle text-slate-500">
                              {user.name}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-end">
                        <button>
                          {members &&
                          members.find((m) => m._id === user._id) ? (
                            <img
                              onClick={() => handleRemoveFromGroup(user)}
                              className="w-10 h-10 rounded-full"
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyaAee26mOCJ4ugx_Fs0QprRd6RcXrU2KBjWoScmTKmw&s"
                              alt=""
                            />
                          ) : (
                            <img
                              onClick={() => handleAddToGroup(user)}
                              className="w-10 h-10 rounded-full"
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0JpizWgT7g4Wleker4p6TXVxmfIKclxZRA3ng9Y5tQy_1PnhEY6OyGp4nNoK8pggQIY0&usqp=CAU"
                              alt=""
                            />
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
            </div>

            <div id="tags-container" className="mt-2 flex flex-wrap">
              {members &&
                members.map((member, index) => (
                  <div
                    key={index}
                    className="tag mr-2 mb-2  bg-teal-300 px-2 py-1 rounded-md"
                  >
                    <span className="tag-text text-white">
                      {member.username}
                    </span>
                    <button
                      className="tag-close text-amber-800"
                      onClick={() => handleRemoveFromGroup(member)}
                    >
                      x
                    </button>
                  </div>
                ))}
            </div>
          </div>
          <div className="border-t px-4 py-2 flex justify-end">
            <button
              className="px-3 py-1 bg-indigo-500 text-white rounded-md"
              onClick={() => handleCreateGroup()}
            >
              Create
            </button>
          </div>
        </div>
      </div>
      {/* CreateGroup */}

      {/* searchusertochat */}
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-20">
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>

          <div className="relative z-30 bg-white rounded-lg shadow-lg p-8 w-96">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Modal Title */}
            <h2 className="text-xl font-semibold text-blue-gray-900 mb-4">
              Search a User to start a chat ...
            </h2>

            {/* Search Box */}
            <input
              onChange={(e) => handleSearch(e)}
              type="text"
              placeholder="Search..."
              className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
            />
            <div>
              {!query && (
                <div className="h-60 border border-gray-200 rounded-md p-4">
                  <img
                    className="ml-6 w-60 h-60"
                    src="https://c7.alamy.com/comp/2PYJM19/illustration-of-icon-searching-cute-magnifying-glass-in-blue-perfect-for-social-media-icons-ads-poster-elements-marketing-ad-elements-search-ico-2PYJM19.jpg"
                    alt="Search icon"
                  />
                </div>
              )}
              {/* Scrollable Div */}
              {query && (
                <div className="h-60 overflow-y-auto border border-gray-200 rounded-md p-4">
                  {loading ? (
                    <img
                      src="https://media.tenor.com/wpSo-8CrXqUAAAAi/loading-loading-forever.gif"
                      alt="Loading..."
                      className="w-10 h-10 ml-28 mt-20"
                    />
                  ) : (
                    searchResults.map((user, index) => (
                      <div
                        key={index}
                        onClick={() => handleSearchAppend(user._id)}
                        className="user-row flex items-center justify-between cursor-pointer p-2 duration-300 sm:flex-row sm:py-2 sm:px-4 hover:bg-teal-100 transform hover:scale-105"
                      >
                        <div className="user flex items-center text-center flex-col sm:flex-row sm:text-left">
                          <div className="avatar-content mb-1 sm:mb-0 sm:mr-2">
                            <img
                              className="avatar w-16 h-16 rounded-full"
                              src={user.image.toString()}
                              alt={`${user.username}'s avatar`}
                            />
                          </div>
                          <div className="user-body flex flex-col mb-2 sm:mb-0 sm:mr-2">
                            <a
                              href="#"
                              className="title font-medium no-underline"
                            >
                              {user.username}
                            </a>
                            <div className="skills flex flex-col">
                              <span className="subtitle text-slate-500">
                                {user.name}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {/* searchusertochat */}

      <div className=" flex-1 overflow-hidden flex h-full w-500px float-left">
        <div className="pt-2  w-5/5 flex-2 flex-col pr-6">
          {/* groupbtn & searchuserbtn */}
          <div className="mt-2 ml-36 mr-6 search flex items-center justify-between pb-6 px-2">
            <button>
              <img
                onClick={() => setGroupModal(true)}
                className="w-10 h-10 object-cover group-hover:scale-110 transition duration-500 ease-in-out"
                src="https://cdn0.iconfinder.com/data/icons/round-user-avatar/33/user_circle_group_team_company_add_create-1-512.png"
                alt=""
              />
            </button>

            <button
              onClick={() => setIsModalOpen(true)}
              class="group relative w-10 h-10 focus:outline-none"
            >
              <img
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500 ease-in-out"
                src="https://cdn.icon-icons.com/icons2/806/PNG/512/chat-26_icon-icons.com_65943.png"
                alt="Chat icon"
              />
            </button>
          </div>
          {/* groupbtn & searchuserbtn */}

          <div className="flex-1 h-full overflow-y-scroll px-2 border">
            {chats &&
              chats.map((chat) => (
                <div
                  onClick={() => setSelectedChat(chat)}
                  className={`entry cursor-pointer transform hover:scale-105 duration-300 transition-transform p-4 flex shadow-md ${
                    selectedChat === chat ? "bg-blue-800" : "bg-blue-500"
                  } mb-4 rounded`}
                >
                  <div className="flex-2">
                    <div className="w-12 h-12 relative">
                      <img
                        className="w-12 h-12 rounded-full mx-auto"
                        src={getSenderImage(userId, chat.users)}
                        alt="chat-user"
                      />
                      <span className="absolute w-4 h-4 bg-green-400 rounded-full right-0 bottom-0 border-2 border-white"></span>
                    </div>
                  </div>
                  <div className="flex-1 px-2">
                    <div className="truncate w-32">
                      <span className="text-white">
                        {!chat.isGroupChat
                          ? getSender(userId, chat.users)
                          : chat.latestMessage?.sender.username}
                      </span>
                    </div>
                    <div>
                      <small class="text-gray-100">
                        {chat.latestMessage?.content?.length > 14
                          ? chat.latestMessage?.content?.substring(0, 14) +
                            "..."
                          : chat.latestMessage?.content || ""}
                      </small>{" "}
                    </div>
                  </div>
                  <div className="flex-2 text-right">
                    <div>
                      <small className="text-gray-200">
                        {new Date(
                          chat.latestMessage?.createdAt
                        ).toLocaleString()}
                      </small>
                    </div>
                    <div>
                      <small className="text-xs bg-red-500 text-white rounded-full h-6 w-6 leading-6 text-center inline-block">
                        23
                      </small>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default MessageList;
