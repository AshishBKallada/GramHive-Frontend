import React, { useEffect, useState } from "react";
import { WavyBackground } from "../../Components/External/wavy-backgroubd";
import { useLocation, useNavigate } from "react-router-dom";
import Stories from "react-insta-stories";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { useSelector } from "react-redux";
import { onUpdateStory } from "../../services/services";

export function Story() {

  const userId = useSelector((state)=>state.user.user._id);
  const location = useLocation();
  const { state } = location;
  const user = state?.story?.user;

  console.log('story Owner',user._id);

useEffect(()=>{
  updateStoryView(userId,user._id);
  },[])

  const updateStoryView = async (userId,viewer)=>{
     await onUpdateStory(viewer,userId);
  }

 

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const redirectToHome = () => {
    navigate("/");
  };

  function getStoriesObject() {
    const stories = state.story.stories.map((story, index) => {
      return {
        content: (props) => (
          <div className="story-container bg-black w-screen h-screen flex items-start justify-center">
            <div className="absolute top-0 left-0 right-0 m-4 text-white text-center">
              {formatDistanceToNow(new Date(story.createdAt), {
                addSuffix: true,
              })}
              <br />
            </div>
            <div
              className="w-full h-full bg-black max-w-screen-md flex items-center justify-center flex-col bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${story.story})` }}
            >
              <div
                className="mt-12 caption text-5xl font-bold"
                style={{ color: "white" }}
              ></div>
            </div>
          </div>
        ),
      };
    });
    return stories;
  }

  return (
    <>
      <WavyBackground>
        <div className="flex items-center justify-center w-screen h-screen">
          <div className="mt-4 flex flex-col items-center justify-center w-96 bg-white shadow-black shadow-2xl rounded-lg border border-black">
            <div className="p-4 sm:p-4 dark:bg-black dark:text-white rounded-t-lg">
              <div className="mr-32 flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
                <img
                  src={state.story.user.image}
                  alt=""
                  className="self-center flex-shrink-0 w-16 h-16 border rounded-full md:justify-self-start dark:bg-gray-500 dark:border-gray-300"
                />
                <div className="flex flex-col">
                  <h4 className="text-black text-xl font-semibold text-center md:text-left">
                    {state.story.user.username}
                  </h4>
                  <h56 className="text-gray-500 font-semibold text-center md:text-left">
                    {state.story.user.name}
                  </h56>
                  <p className="dark:text-white"></p>
                </div>
              </div>
            </div>

            <div className="stories-container w-full flex-grow">
              <center>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="relative w-[370px] h-[435px] stories-container">
                    <Stories
                      stories={getStoriesObject()}
                      defaultInterval={5000}
                      width="100%"
                      height="100%"
                      onAllStoriesEnd={redirectToHome}
                      onStoryEnd={() => setLoading(true)}
                      isPaused={isPaused}
                    />
                  </div>
                </motion.div>
              </center>
            </div>

            <div></div>
            {/* <div className="w-96">
              <div className="relative w-full min-w-[200px] h-14  bg-white shadow-2xl">
                <div className="absolute grid w-5 h-5 place-items-center text-blue-500 top-2/4 right-3 -translate-y-2/4">
                  <i className="fa fa-paper-plane" aria-hidden="true"></i>
                </div>
                <input
                  className="peer w-full h-full bg-transparent text-black font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] !pr-9 border-blue-gray-200 focus:border-gray-900"
                  placeholder=" "
                />
                <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:flex-grow before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-black peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                  Send Reply...
                </label>
              </div>
            </div> */}
          </div>
        </div>
      </WavyBackground>
    </>
  );
}
