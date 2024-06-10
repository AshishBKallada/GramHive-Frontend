import React, { useEffect, useState } from "react";
import { getSuggestions, onFollowUser } from "../../../services/services";
import { useSelector } from "react-redux";
import { useToast } from "@chakra-ui/react";

function Suggestions() {
  const [users, setUsers] = useState([]);
  const userId = useSelector((state) => state.user.user._id);
  const toast = useToast();

  useEffect(() => {
    fetchSuggestions();
  }, []);

  const fetchSuggestions = async () => {
    const response = await getSuggestions();
    setUsers(response.data.users);
  };

  const handleFollowUser = async (followed_id,username) => {
    const response = await onFollowUser(userId, followed_id);
    if (response.data.success) {
      toast({
        title: `Started Following ${username}.`,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } else {
      toast({
        title: `Failed to follow ${username}.`,
        description: "Try again later.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <div className="mb-2">
      <h2 className=" text-md font-semibold mb-2">Suggested:</h2>
      <div className="flex justify-center space-x-6">
        {users.length > 0 &&
          users.map((user) => (
            <div className="flex flex-col justify-center max-w-xs p-1 shadow-md rounded-lg sm:p-2 dark:bg-gray-50 dark:text-gray-800 w-28">
              <img
                src={user?.image}
                alt=""
                className="w-12 h-12 mx-auto rounded-full dark:bg-gray-500 aspect-square"
              />
              <div className="space-y-1 text-center divide-y dark:divide-gray-300 mt-2">
                <div className="my-1 space-y-1">
                  <h2 className="text-xs font-semibold sm:text-sm">
                    {user?.username}
                  </h2>
                  <p className="px-1 text-xxs sm:text-xs dark:text-gray-600">
                    {user?.name}
                  </p>
                </div>
                <div className="flex justify-center pt-1 space-x-1 align-center">
                  <button
                    onClick={() => handleFollowUser(user._id,user.username)}
                    className="bg-blue-500 text-white px-1 py-0.5 text-xxs rounded"
                  >
                    Follow
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Suggestions;
