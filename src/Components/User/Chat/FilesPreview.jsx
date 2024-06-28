import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { FileInput, Label } from "flowbite-react";
import { TrashIcon } from "@heroicons/react/solid";
import { useToast } from "@chakra-ui/react";
import { shareFiles } from "../../../services/services";
import { ChatState } from "../../../Context/ChatProvider";
import FileShareLoading from "../../Loading/FileShareLoading";
import { SocketContext } from "../../../Context/socketContext";

function FilesPreview({ setMessages, isOpen, setIsOpen }) {
  const socket = useContext(SocketContext);

  const { setChats } = ChatState();

  const [files, setFiles] = useState([]);
  const handleOpen = () => setIsOpen(false);
  const toast = useToast();
  const { selectedChat } = ChatState();
  const [loading, setLoading] = useState(false);

  const handleFilesChange = (event) => {
    const newFiles = Array.from(event.target.files);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleRemoveFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleShareFiles = async () => {
    try {
      setLoading(true);
      const { data } = await shareFiles(selectedChat._id, files);
      if (data) {
        setLoading(false);
        const newMessage = data.data;
        toast({
          title: "Files shared!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        setChats((prevChats) =>
          prevChats.map((chat) =>
            chat._id === selectedChat._id
              ? { ...chat, latestMessage: newMessage }
              : chat
          )
        );

        setChats((prevChats) => {
          const updatedChat = { ...selectedChat, latestMessage: data };
          const filteredChats = prevChats.filter(
            (chat) => chat._id !== selectedChat._id
          );
          return [updatedChat, ...filteredChats];
        });
        socket.emit("new message", newMessage);

        handleOpen();
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      } else {
        setLoading(false);
        toast({
          title: "An unknown error occurred!",
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      setLoading(false);
      toast({
        title: "Error sharing files!",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <div>
      <Dialog open={isOpen} handler={handleOpen} size="md">
        <DialogHeader>Add Files To Share!</DialogHeader>
        <DialogBody>
          {loading && <FileShareLoading />}

          <div className="flex w-full items-center justify-center">
            <Label
              htmlFor="dropzone-file"
              className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pb-6 pt-5">
                <svg
                  className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG, GIF, MP4, or PDF (MAX. 10MB)
                </p>
              </div>
              <FileInput
                id="dropzone-file"
                className="hidden"
                onChange={handleFilesChange}
                multiple
              />
            </Label>
          </div>
          <div className="mt-4 grid grid-cols-6 gap-4">
            {files.map((file, index) => (
              <div
                key={index}
                className="relative flex items-center justify-center border p-2"
              >
                <span className="text-sm">{file.name}</span>
                <button
                  onClick={() => handleRemoveFile(index)}
                  className="absolute top-1 right-1 text-red-600"
                >
                  <TrashIcon className="h-5 w-5" />
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
          <Button onClick={handleShareFiles} variant="gradient" color="green">
            <span>Send</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export default FilesPreview;
