import React, { use, useContext, useEffect, useState } from "react";
import WebcamSample from "../../../pages/User/Test";
import { getStories, uploadStory } from "../../../services/services";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "../../External/LoadingSpinner";

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import LiveModal from "../Live/LiveCarosuel";
import { SocketContext } from "../../../Context/socketContext";

function Story() {
  const userId = useSelector((state) => state.user.user._id);
  const member = useSelector((state) => state.user.user);

  const [isStory, setIsStory] = useState(false);
  const [storyModal1, setStoryModal1] = useState(false);
  const [showCam, setShowCam] = useState(false);
  const [storyFromInput, setStoryFromInput] = useState(null);
  const [stories, setStories] = useState([]);

  const [loading, setLoading] = useState(false);
  const [liveModal, setLiveModal] = useState(false);

  const [streamers, setStreamers] = useState([]);

  const handleStoryModal1 = () => {
    () => setStoryModal1((prev) => !prev);
  };

  const socket = useContext(SocketContext);
  useEffect(() => {
    if (socket) {
      socket.on("liveStreamStarted", (data) => {
        const { liveStreamData } = data;
        console.log("userId", liveStreamData);
        setStreamers([...streamers, liveStreamData]);
        return () => {
          socket.disconnect();
        };
      });
    }
  }, []);

  useEffect(() => {
    try {
      const fetchStories = async (userId) => {
        const response = await getStories(userId);
        if (response.status === 200) {
          console.log("Retreived stories successfully ", response.data.stories);
          setStories(response.data.stories);
        }
      };
      fetchStories(userId);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleShowCam = (cam, modal) => {
    setShowCam(cam);
    setStoryModal1(modal);
  };
  const handleUploadStory = async (story) => {
    try {
      setLoading(true);

      setTimeout(async () => {
        const response = await uploadStory(userId, story);
        if (response.status === 200) {
          toast.success("Story uploaded successfully", {
            autoClose: 1500,
            closeButton: true,
          });
        }
        setStoryFromInput(null);
        setLoading(false);
        setStoryModal1(false);
      }, 2000);
    } catch (error) {
      setLoading(false);
      console.error("error", error);
      toast.error("Failed to upload story");
    }
  };

  console.log("STREAMERS", streamers);

  return (
    <div>
      {liveModal && (
        <LiveModal liveModal={liveModal} setLiveModal={setLiveModal} />
      )}
      <div className="max-w-full mx-auto p-8">
        <ul className="flex space-x-6 font-serif ">
          <li className="flex flex-col items-center space-y-1 relative">
            {stories && stories.find((story) => story.user._id === userId) ? (
              stories
                .filter((story) => story.user._id === userId)
                .map((story) => (
                  <div
                    className="bg-gray-800 p-1 rounded-full"
                    key={story._id}
                  >
                    <Link to="/stories" state={{ story }}>
                      <div className="bg-white block rounded-full p-1 hover:-rotate-6 transform transition">
                        <img
                          className="h-20 w-20 rounded-full"
                          src={story?.user.image}
                          alt={`${story?.user.username}'s profile picture`}
                        />
                      </div>
                    </Link>
                  </div>
                ))
            ) : (
              <div className="bg-gray-300 p-0.5 rounded-full">
                <a
                  className="bg-white block rounded-full p-1 hover:-rotate-6 transform transition"
                  href="#"
                >
                  <img
                    className="h-20 w-20 rounded-full"
                    src={member?.image}
                    alt="cute kitty"
                  />
                </a>
              </div>
            )}

            <button
              onClick={() => setStoryModal1(true)}
              className="absolute bottom-8 right-1 bg-blue-800 rounded-full h-6 w-6 text-sm text-white font-semibold border-2 border-white flex justify-center items-center font-mono hover:bg-blue-700"
            >
              +
            </button>
            <button
              onClick={() => setLiveModal((prev) => !prev)}
              className="text-white bg-red-400 hover:bg-red-300 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Go Live
              <i class="ml-2 fas fa-television"></i>
            </button>
          </li>
          {streamers &&
            streamers.map((streamer) => {
              return (
                <li
                  key={
                    streamer.streaminguser._id ||
                    streamer.streaminguser.username
                  }
                  className="flex flex-col items-center space-y-1"
                >
                  <div className="relative">
                    <div className="relative">
                      <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-red-500"></div>
                      <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
                        <a
                          href={`https://gramhive6.vercel.app/live?roomID=${streamer.roomID}&role=audience`}
                          className="block"
                        >
                          <img
                            className="h-20 w-20 rounded-full"
                            src={streamer.streaminguser.image}
                            alt={`${streamer.streaminguser.username}'s profile picture`}
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                  <span>{streamer.streaminguser.username}</span>
                </li>
              );
            })}

          {stories &&
            stories
              .filter((story) => story.user._id !== userId)
              .map((story) => {
                return (
                  <li
                    key={story.id || story.user.username}
                    className="flex flex-col items-center space-y-1"
                  >
                    <div className="bg-gradient-to-tr from-teal-500 to-fuchsia-800 p-1 rounded-full">
                      <Link to="/stories" state={{ story }}>
                        <a className="bg-white block rounded-full p-1 hover:-rotate-6 transform transition">
                          <img
                            className="h-20 w-20 rounded-full"
                            src={story.user.image}
                            alt={`${story.user.username}'s profile picture`}
                          />
                        </a>
                      </Link>
                    </div>
                    <Link to={{ pathname: "/stories", state: story }}>
                      {story.user.username}
                    </Link>
                  </li>
                );
              })}
        </ul>
      </div>
      <>
        <Dialog open={storyModal1} handler={handleStoryModal1}>
          <ToastContainer />

          <DialogHeader>Add Story</DialogHeader>
          <DialogBody>
            {loading && <LoadingSpinner />}

            {/*body*/}
            <div className="relative p-6 flex-auto">
              {!storyFromInput ? (
                <>
                  <div class="bg-gray-50 text-center px-4 rounded max-w-md flex flex-col items-center justify-center cursor-pointer border-2 border-gray-400 border-dashed mx-auto font-[sans-serif]">
                    <div class="py-6">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-10 mb-2 fill-gray-600 inline-block"
                        viewBox="0 0 32 32"
                      >
                        <path
                          d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                          data-original="#000000"
                        />
                        <path
                          d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                          data-original="#000000"
                        />
                      </svg>
                      <h4 class="text-base font-semibold text-gray-600">
                        Drag and drop a file here
                      </h4>
                    </div>

                    <hr class="w-full border-gray-400 my-2" />

                    <div class="py-6">
                      <input
                        onChange={(e) => setStoryFromInput(e.target.files[0])}
                        type="file"
                        id="uploadFile1"
                        class="hidden"
                      />
                      <label
                        for="uploadFile1"
                        class="block px-6 py-2.5 rounded text-gray-600 text-sm tracking-wider font-semibold border-none outline-none cursor-pointer bg-gray-200 hover:bg-gray-100"
                      >
                        Browse file
                      </label>
                      <p class="text-xs text-gray-400 mt-4">
                        PNG, JPG SVG, WEBP, and GIF are Allowed.
                      </p>
                    </div>
                  </div>
                  <div className="mt-6">
                    <center>
                      <button
                        onClick={() => handleShowCam(true, false)}
                        className="bg-blue-500 text-white py-2 px-12 rounded flex items-center justify-center"
                      >
                        <img
                          className="w-8 h-8 mr-2"
                          src="https://cdn-icons-png.freepik.com/512/3687/3687416.png"
                          alt=""
                        />
                        <span>Capture from camera</span>
                      </button>
                    </center>
                  </div>
                </>
              ) : (
                <>
                  <button onClick={() => setStoryFromInput(null)}>X</button>

                  <div class="bg-gray-50 text-center px-4 rounded max-w-md flex flex-col items-center justify-center cursor-pointer border-2 border-gray-400 border-dashed mx-auto font-[sans-serif]">
                    <div class="py-6">
                      <img src={URL.createObjectURL(storyFromInput)} />
                    </div>
                  </div>
                </>
              )}
            </div>
          </DialogBody>
          <DialogFooter>
            {!storyFromInput ? (
              <>
                <Button
                  variant="text"
                  color="red"
                  onClick={() => setStoryModal1((prev) => !prev)}
                  className="mr-1"
                >
                  <span>Close</span>
                </Button>
                <Button
                  variant="gradient"
                  color="green"
                  onClick={() => setStoryModal1((prev) => !prev)}
                >
                  <span>Continue</span>
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="text"
                  color="red"
                  onClick={() => setStoryFromInput(null)}
                  className="mr-1"
                >
                  <span>Back</span>
                </Button>
                <Button
                  variant="gradient"
                  color="green"
                  onClick={() => handleUploadStory(storyFromInput)}
                >
                  <span>Confirm</span>
                </Button>
              </>
            )}
          </DialogFooter>
        </Dialog>
      </>

      {showCam && <WebcamSample showCam={showCam} handleBack={handleShowCam} />}
    </div>
  );
}

export default Story;
