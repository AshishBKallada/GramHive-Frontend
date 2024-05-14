import React, { useState } from "react";
import { WavyBackground } from "../../Components/User/external/wavy-backgroubd";
import { useLocation, useNavigate } from "react-router-dom";

import Stories from "react-insta-stories";
import Fade from "react-reveal/Fade";
import LoadingSpinner from "../../Components/External/LoadingSpinner";
import 'emoji-picker-element';

export function Story() {
  const location = useLocation();
  const { state } = location;
  const user = state?.story?.user;

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [isPaused, setIsPaused] = useState(false); // State to control story pause/resume

  const redirectToHome = () => {
    navigate("/");
  };

  function getStoriesObject() {
    const stories = state.story.stories.map((story, index) => {
      console.log(story);
      return {
        content: (props) => (
          <div className="story-container bg-black w-screen h-screen flex items-start justify-center">
            <div
              className="w-full h-full bg-black max-w-screen-md flex items-center justify-center flex-col bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${story})` }}
            >
              <div
                className="mt-12 caption text-5xl font-bold"
                style={{ color: "white" }}
              >
                {/* <span>Story</span> */}
              </div>
            </div>
          </div>
        ),
      };
    });
    return stories;
  }

  return (
    <>
      {/* {loading && <LoadingSpinner />} */}

      <WavyBackground>
        <div className="mt-4 flex flex-col items-center justify-center h-screen">
          <div
            style={{
              width: "450px",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
            }}
            className="p-2 sm:p-2 dark:bg-black dark:text-white"
          >
            <div className="mr-32 flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
              <img
                src={state.story.user.image}
                alt=""
                className="self-center flex-shrink-0 w-20 h-20 border rounded-full md:justify-self-start dark:bg-gray-500 dark:border-gray-300"
              />
              <div className="flex flex-col">
                <h4 className="text-lg font-semibold text-center md:text-left">
                  {state.story.user.username}
                </h4>
                <p className="dark:text-white">2 hrs ago ...</p>
              </div>
            </div>
          </div>

          <div className="stories-container w-screen flex-grow">
            <center>
              <Fade>
                <Stories
                  stories={getStoriesObject()}
                  defaultInterval={3000}
                  width={"450px"}
                  height="550px"
                  onAllStoriesEnd={redirectToHome}
                  onStoryEnd={() => setLoading(true)}
                  isPaused={isPaused} // Pass the isPaused state to control pause/resume
                />
              </Fade>
              <div class="flex bg-black px-2 w-full max-w-[450px] border border-white">

                <input
                  type="text"
                  class="w-full bg-[#0d1829] flex bg-transparent pl-2 text-[#cccccc] outline-0"
                  placeholder="Reply with a message..."
                />
                
                <button
                  class="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                  type="button"
                >
                  <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                    <i class="fas fa-heart" aria-hidden="true"></i>
                  </span>
                </button>
                <button
                  type="submit"
                  class="relative p-2 bg-[#0d1829] rounded-full"
                >
                 <img className="w-10 h-10" src="https://cdn-icons-png.freepik.com/256/14720/14720114.png?semt=ais_hybrid" alt="" />
                </button>
              </div>
            </center>
          </div>
        </div>
      </WavyBackground>
    </>
  );
}
