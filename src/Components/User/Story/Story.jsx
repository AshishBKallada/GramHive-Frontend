import React, { useEffect, useState } from 'react';
import WebcamSample from '../../../pages/User/Test';
import { getStories, uploadStory } from '../../../services/services';
import { useSelector } from 'react-redux';

function Story() {

  const userId = useSelector((state) => state.user.user._id)

  const [isStory, setIsStory] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showCam, setShowCam] = useState(false)
  const [storyFromInput, setStoryFromInput] = useState(null);
  const [stories, setStories] = useState([]);

  useEffect(() => {
    try {
      const fetchStories = async (userId) => {
        const response = await getStories(userId);
        if (response.status === 200) {
          console.log('Retreived stories successfully ', response.data.stories);
          setStories(response.data.stories);
        }
      }
      fetchStories(userId);
    } catch (error) {
      console.error(error);
    }
  }, [])

  console.log('Storties',stories);


  const handleShowCam = (cam, modal) => {
    setShowCam(cam);
    setShowModal(modal)
  }
  const handleUploadStory = async (story) => {
    try {
      setTimeout(async () => {
        const response = await uploadStory(userId, story)
        if (response.status === 200) {
          console.log('story uploaded successfully');
        }
      }, 5000)
    } catch (error) {
      console.error('error', error);
    }
  }

  return (
    <div>
      <div className="max-w-full mx-auto p-8">

        <ul className="flex space-x-6 font-serif ">

          <li className="flex flex-col items-center space-y-1 relative">
            {isStory ?
              <div className="bg-gradient-to-tr from-yellow-300 to-fuchsia-800 p-1 rounded-full">
                <a className=" bg-white block rounded-full p-1 hover:-rotate-6 transform transition" href="#">
                  <img className="h-20 w-20 rounded-full" src="data:image/jpeg;base64,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" alt="cute kitty" />
                </a>
              </div>
              :
              <div className="bg-gray-300 p-0.5 rounded-full">
                <a className=" bg-white block rounded-full p-1 hover:-rotate-6 transform transition" href="#">
                  <img className="h-20 w-20 rounded-full" src="data:image/jpeg;base64,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" alt="cute kitty" />
                </a>
              </div>
            }

            <button onClick={() => setShowModal(true)} className="absolute bottom-8 right-1 bg-blue-800 rounded-full h-6 w-6 text-sm text-white font-semibold border-2 border-white flex justify-center items-center font-mono hover:bg-blue-700">+</button>
            <a href="#">you</a>
          </li>

          {stories && stories.map((story) => {
            return(
            <li className="flex flex-col items-center space-y-1">
              <div className="bg-gradient-to-tr from-yellow-500 to-fuchsia-600 p-1 rounded-full">
                <a className=" bg-white block rounded-full p-1 hover:-rotate-6 transform transition" href="/stories">
                  <img className="h-20 w-20 rounded-full" src={story.user.image} alt="cute kitty" />
                </a>
              </div>
              <a href="/stories">{story.user.username}</a>
            </li>
            )
          })}

          {/* <li className="flex flex-col items-center space-y-1">
            <div className="bg-gradient-to-tr from-yellow-500 to-fuchsia-600 p-1 rounded-full">
              <a className=" bg-white block rounded-full p-1 hover:-rotate-6 transform transition" href="#">
                <img className="h-20 w-20 rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwhY4jMcJRe3rX6nGFspATEeC8X53xqeP_grEkAWq6LQ&s" alt="cute kitty" />
              </a>
            </div>
            <a href="#">Sean_o_pry</a>
          </li>

          <li className="flex flex-col items-center space-y-1">
            <div className="bg-gradient-to-tr from-yellow-500 to-fuchsia-600 p-1 rounded-full">
              <a className=" bg-white block rounded-full p-1 hover:-rotate-6 transform transition" href="#">
                <img className="h-20 w-20 rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRakohiVIj1RWGlC0VRJxEh7v9l8oBPrLP0q_NJOgDOiQ&s" alt="cute kitty" />
              </a>
            </div>
            <a href="#">gigi_</a>
          </li>


          <li className="flex flex-col items-center space-y-1">
            <div className="bg-gradient-to-tr from-yellow-500 to-fuchsia-600 p-1 rounded-full">
              <a className=" bg-white block rounded-full p-1 hover:-rotate-6 transform transition" href="#">
                <img className="h-20 w-20 rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZtgqiLY061DcV3ExqW_zEoZMwk4nKdZnkrep6U6ftPg&s" alt="cute kitty" />
              </a>
            </div>
            <a href="#">chico_lachowski</a>
          </li>

          <li className="flex flex-col items-center space-y-1">
            <div className="bg-gradient-to-tr from-yellow-500 to-fuchsia-600 p-1 rounded-full">
              <a className=" bg-white block rounded-full p-1 hover:-rotate-6 transform transition" href="#">
                <img className="h-20 w-20 rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwhY4jMcJRe3rX6nGFspATEeC8X53xqeP_grEkAWq6LQ&s" alt="cute kitty" />
              </a>
            </div>
            <a href="#">Sean_o_pry</a>
          </li>

          <li className="flex flex-col items-center space-y-1">
            <div className="bg-gradient-to-tr from-yellow-500 to-fuchsia-600 p-1 rounded-full">
              <a className=" bg-white block rounded-full p-1 hover:-rotate-6 transform transition" href="#">
                <img className="h-20 w-20 rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRakohiVIj1RWGlC0VRJxEh7v9l8oBPrLP0q_NJOgDOiQ&s" alt="cute kitty" />
              </a>
            </div>
            <a href="#">gigi_</a>
          </li> */}
        </ul>

      </div>

      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-full sm:w-auto my-6 mx-auto max-w-xl sm:max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-2xl sm:text-3xl font-semibold">
                    Add Story
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  {!storyFromInput ? (
                    <>
                      <div
                        class="bg-gray-50 text-center px-4 rounded max-w-md flex flex-col items-center justify-center cursor-pointer border-2 border-gray-400 border-dashed mx-auto font-[sans-serif]">
                        <div class="py-6">
                          <svg xmlns="http://www.w3.org/2000/svg" class="w-10 mb-2 fill-gray-600 inline-block" viewBox="0 0 32 32">
                            <path
                              d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                              data-original="#000000" />
                            <path
                              d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                              data-original="#000000" />
                          </svg>
                          <h4 class="text-base font-semibold text-gray-600">Drag and drop a file here</h4>
                        </div>

                        <hr class="w-full border-gray-400 my-2" />

                        <div class="py-6">
                          <input onChange={(e) => setStoryFromInput(e.target.files[0])} type="file" id='uploadFile1' class="hidden" />
                          <label for="uploadFile1"
                            class="block px-6 py-2.5 rounded text-gray-600 text-sm tracking-wider font-semibold border-none outline-none cursor-pointer bg-gray-200 hover:bg-gray-100">Browse
                            file</label>
                          <p class="text-xs text-gray-400 mt-4">PNG, JPG SVG, WEBP, and GIF are Allowed.</p>
                        </div>

                      </div>
                      <div className='mt-2'>
                        <center>

                          <button onClick={() => handleShowCam(true, false)} className="bg-blue-500 text-white py-2 px-12 rounded flex items-center justify-center">
                            <img className='w-8 h-8 mr-2' src="https://cdn-icons-png.freepik.com/512/3687/3687416.png" alt="" />
                            <span>Capture from camera</span>
                          </button>
                        </center></div>
                    </>

                  ) : (
                    <>
                      <button onClick={() => setStoryFromInput(null)}>X</button>

                      <div
                        class="bg-gray-50 text-center px-4 rounded max-w-md flex flex-col items-center justify-center cursor-pointer border-2 border-gray-400 border-dashed mx-auto font-[sans-serif]">
                        <div class="py-6">
                          <img src={URL.createObjectURL(storyFromInput)} />
                        </div></div>
                    </>
                  )}


                </div>


                {/*footer*/}
                {!storyFromInput ? <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Continue
                  </button>
                </div>
                  :
                  <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setStoryFromInput(null)}
                    >
                      Back
                    </button>
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => handleUploadStory(storyFromInput)}
                    >
                      Continue
                    </button>
                  </div>}

              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

      {showCam && (
        <WebcamSample handleBack={handleShowCam} />
      )}


    </div>
  );
}

export default Story;
