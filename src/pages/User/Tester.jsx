import React, { useState } from 'react';
import VideoRecorder from 'react-video-recorder';

const S3VideoRecorder = ({ handleUploadStory, handleBack }) => {

    const [vedio, setVedio] = useState(null);

    const handleRecordingComplete = (videoBlob) => {
        const videoFile = new File([videoBlob], 'recorder_vedio.mp4', { type: 'video/mp4' });
        setVedio(videoFile);
    };



    return (
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

                        <div className="fullscreen-video-recorder">
                            <div style={{ width: '600px', height: '600px' }}>
                                <VideoRecorder
                                    onRecordingComplete={handleRecordingComplete}
                                    isOnInitially={false}
                                />
                            </div>

                        </div>

                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                            <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => handleBack(false)}
                            >
                                Back
                            </button>
                            <button
                                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => handleUploadStory(vedio)}
                            >
                                Continue
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>

    );
};

export default S3VideoRecorder;
