import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import Webcam from "react-webcam";
import { uploadStory } from "../../services/services";
import S3VideoRecorder from "./Tester";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLoading } from "../../Context/LoadingContext";
import LoadingSpinner from "../../Components/External/LoadingSpinner";

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

function WebcamSample({ setShowCam,showCam, handleBack }) {
  const userId = useSelector((state) => state.user.user._id);
  const navigate = useNavigate();
  const { isLoading, setLoading } = useLoading();

  const [showtoast, setToast] = useState(false);

  const [showFlash, setShowFlash] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [vedioRecorder, setVedioRecorder] = useState(false);

  const videoElement = useRef(null);
  const flashTimeout = useRef(null);

  const videoConstraints = {
    width: 640,
    height: 480,
    facingMode: "user",
  };

  const capturePhoto = () => {
    setShowFlash(true);
    clearTimeout(flashTimeout.current);
    flashTimeout.current = setTimeout(() => {
      setShowFlash(false);
      const imageSrc = videoElement.current.getScreenshot();
      setCapturedPhoto(imageSrc);
    }, 300);
  };

  const handleUploadStory = async (story) => {
    try {
      setLoading(true);
      const response = await uploadStory(userId, story);
      if (response.status === 200) {
        setTimeout(() => {
          toast.success("story uploaded", {
            autoClose: 1000,
            onClose: () => {
              setLoading(false);
              setCapturedPhoto(null);
              handleBack()
            },
          });
        }, 2000);
      }
    } catch (error) {
      console.error("error", error);
    }
  };
//   if (isLoading) {
//     return (
//       <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
//         {" "}
//         <div className="relative w-full sm:w-auto my-6 mx-auto max-w-xl sm:max-w-3xl">
//           <LoadingSpinner />
//         </div>
//       </div>
//     );
//   }


  if (vedioRecorder) {
    return (
      <>
        <S3VideoRecorder
          handleUploadStory={handleUploadStory}
          handleBack={setVedioRecorder}
        />
      </>
    );
  }
  if (capturedPhoto) {
    return (
      <>
        <Dialog open={capturePhoto!=null} handler={() => setCapturedPhoto(null)}>
            <ToastContainer />
            {isLoading && <LoadingSpinner/>}
          <DialogHeader>Add Story</DialogHeader>
          <DialogBody>
            <div>
              <img src={capturedPhoto} alt="Captured" />
            </div>
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={() => setCapturedPhoto(null)}
              className="mr-1"
            >
              <span>Back</span>
            </Button>
            <Button
              variant="gradient"
              color="green"
              onClick={() => handleUploadStory(capturedPhoto)}
            >
              <span>Continue</span>
            </Button>
          </DialogFooter>
        </Dialog>
      </>
    );
  }
  return (
    <>
      <Dialog open={showCam} handler={handleBack}>
        <DialogHeader>Add Story</DialogHeader>
        <DialogBody>
          <div
            className="camView"
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Webcam
              audio={false}
              ref={videoElement}
              videoConstraints={videoConstraints}
            />

            {showFlash && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(255, 255, 255, 0.5)",
                  zIndex: 999,
                }}
              ></div>
            )}

            <div
              style={{ position: "absolute", bottom: 0, marginBottom: "20px" }}
            >
              <button onClick={capturePhoto} style={{ marginRight: "10px" }}>
                <img
                  className="w-8 h-8"
                  src="https://cdn-icons-png.freepik.com/512/3687/3687416.png"
                  alt=""
                />
              </button>
              <button onClick={() => setVedioRecorder(true)}>
                <img
                  className="w-8 h-8"
                  src="https://freepngimg.com/download/icon/video_icon/30778-3-video-icon-transparent.png"
                  alt=""
                />
              </button>
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => handleBack(false, true)}
            className="mr-1"
          >
            <span>Back</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleBack}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>

    // <>

    //     <div
    //         className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
    //     >
    //         <div className="relative w-full sm:w-auto my-6 mx-auto max-w-xl sm:max-w-3xl">
    //             {/*content*/}
    //             <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
    //                 {/*header*/}
    //                 <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
    //                     <h3 className="text-2xl sm:text-3xl font-semibold">
    //                         Add Story
    //                     </h3>
    //                     <button
    //                         className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
    //                         onClick={() => setShowModal(false)}
    //                     >
    //                         <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
    //                             ×
    //                         </span>
    //                     </button>
    //                 </div>

    //                 <div className="camView" style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
    //                     <Webcam audio={false} ref={videoElement} videoConstraints={videoConstraints} />

    //                     {showFlash && (
    //                         <div
    //                             style={{
    //                                 position: 'absolute',
    //                                 top: 0,
    //                                 left: 0,
    //                                 width: '100%',
    //                                 height: '100%',
    //                                 backgroundColor: 'rgba(255, 255, 255, 0.5)',
    //                                 zIndex: 999
    //                             }}
    //                         ></div>
    //                     )}

    //                     <div style={{ position: 'absolute', bottom: 0, marginBottom: '20px' }}>
    //                         <button onClick={capturePhoto} style={{ marginRight: '10px' }}>
    //                             <img className='w-8 h-8' src="https://cdn-icons-png.freepik.com/512/3687/3687416.png" alt="" />
    //                         </button>
    //                         <button onClick={() => setVedioRecorder(true)}>
    //                             <img className='w-8 h-8' src="https://freepngimg.com/download/icon/video_icon/30778-3-video-icon-transparent.png" alt="" />
    //                         </button>
    //                     </div>

    //                 </div>

    //                 {/*footer*/}
    //                 <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
    //                     {/* <button onClick={() => handleBack(false, true)}
    //                         type="button" class="bg-gray-800 text-white rounded-l-md border-r border-gray-100 py-2 hover:bg-red-700 hover:text-white px-3">
    //                         <div class="flex flex-row align-middle">
    //                             <svg class="w-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    //                                 <path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd"></path>
    //                             </svg>
    //                             <p class="ml-2">Back</p>

    //                     </button>  */}
    //                     <button
    //                         className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
    //                         type="button"
    //                         onClick={() => handleBack(false, true)}
    //                     >
    //                         Back
    //                     </button>
    //                     {/* <button
    //                         className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
    //                         type="button"
    //                         onClick={() => setShowModal(false)}
    //                     >
    //                         Continue
    //                     </button> */}
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    //     <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    // </>
  );
}

export default WebcamSample;
