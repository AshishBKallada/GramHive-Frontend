import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import WebcamSample from "../../../pages/User/Test";
 
export function AddStory1() {
    const userId = useSelector((state) => state.user.user._id);

    const [showCam, setShowCam] = useState(false);
    const [storyFromInput, setStoryFromInput] = useState(null);
  
    
  
  
    const handleShowCam = (cam, modal) => {
      setShowCam(cam);
      setShowModal(modal);
    };
    const handleUploadStory = async (story) => {
      try {
        setTimeout(async () => {
          const response = await uploadStory(userId, story);
          if (response.status === 200) {
            console.log("story uploaded successfully");
          }
        }, 5000);
      } catch (error) {
        console.error("error", error);
      }
    };
 
  return (
    <>
      <Button onClick={handleOpen} variant="gradient">
        Open Dialog
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Its a simple dialog.</DialogHeader>
        <DialogBody>
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
                            onChange={(e) =>
                              setStoryFromInput(e.target.files[0])
                            }
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
                      <div className="mt-2">
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
                  {/*footer*/}
                  {!storyFromInput ? (
                  <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
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
                ) : (
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
                  </div>
                )}
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
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
      {showCam && <WebcamSample setShowCam={setShowCam} handleBack={handleShowCam} />}

    </>
  );
}