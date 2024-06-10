import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { getUsers, sharePost } from "../../../services/services";
import { useToast } from "@chakra-ui/react";

export function ShareModal({ open, handleOpen ,postId}) {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const toast = useToast();

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    handleSearch();
  };

  const handleSearch = async () => {
    const response = await getUsers(query);
    setUsers(response.data);
  };

  const handleSelectUser = (user) => {
    if (!selectedUsers.find((selectedUser) => selectedUser._id === user._id)) {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const handleRemoveUser = (user) => {
    setSelectedUsers(selectedUsers.filter((item) => item !== user));
  };

  const handleShare = async () => {
    const response = await sharePost(postId,selectedUsers);
    if (response.data.success) {
      handleOpen();
      toast({
        title: "Post shared",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Oops ! an error occured",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Button onClick={handleOpen} variant="gradient">
        Open Dialog
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Share Post</DialogHeader>
        <DialogBody>
          <div class="max-w-md mx-auto">
            <div class="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
              <div class="grid place-items-center h-full w-12 text-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              <input
                onChange={handleInputChange}
                class="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                type="text"
                id="search"
                placeholder="Search something.."
              />
            </div>
          </div>
          <div className="p-6 max-h-[15rem] overflow-y-auto bg-white ">
            {users.map((user, index) => (
              <div
                onClick={() => handleSelectUser(user)}
                key={index}
                className="flex items-center border-b hover:border-gray-400 hover:bg-teal-400 hover:text-white rounded-lg p-2 h-20"
              >
                <img
                  src={user.image}
                  alt={user.username}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span>{user.username}</span>
                  <span className="text-xs text-gray-500">{user.name}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center mt-4">
            {selectedUsers.map((user) => (
              <div
                key={user._id}
                className="tag bg-black px-2 py-1 rounded-md mr-2 mb-2"
              >
                <span className="tag-text text-white">{user.username}</span>
                <button
                  className="tag-close text-amber-800 ml-2"
                  onClick={() => handleRemoveUser(user)}
                >
                  x
                </button>
              </div>
            ))}
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button onClick={handleShare} variant="gradient" color="green">
            <span>Share</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
