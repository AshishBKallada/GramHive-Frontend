import React, { useContext, useState } from "react";
import RecordRTC from "recordrtc";
import { uploadAudio } from "../../services/services";
import { ChatState } from "../../Context/ChatProvider";
import { SocketContext } from "../../Context/socketContext";

let recorder = null;
let stream = null;

function RecorderJSDemo({ setMessages }) {
  const socket = useContext(SocketContext);

  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState(null);
  const { selectedChat,setChats } = ChatState();

  const startRecording = async () => {
    setError(null);

    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      recorder = new RecordRTC(stream, { type: "audio" });
      recorder.startRecording();
      setIsRecording(true);
    } catch (err) {
      setError("Failed to access microphone: " + err.message);
      console.error("getUserMedia error:", err);
    }
  };

  const stopRecording = async () => {
    if (!recorder) {
      setError("No recording in progress");
      return;
    }
    recorder.stopRecording(async () => {
      const blob = recorder.getBlob();
      stream.getAudioTracks().forEach((track) => track.stop());
      setIsRecording(false);
      await onStop(blob);
    });
  };

  const onStop = async (blob) => {
    let data = new FormData();
    data.append("text", "this is the transcription of the audio file");
    data.append("wavfile", blob, "recording.wav");

    try {
      const response = await uploadAudio(selectedChat._id, data);
      if (response.data) {
        console.log('inaa PIDICHO DATA', response.data);
        const newMessage = response.data.data;

        setChats(prevChats =>
          prevChats.map(chat =>
            chat._id === selectedChat._id
              ? { ...chat, latestMessage: newMessage }
              : chat
          )
        );
        if (socket) {
          socket.emit("new message", newMessage);
        } else {
          console.error("Socket not initialized");
        }
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    } catch (error) {
      setError("Failed to upload audio: " + error.message);
      console.error("Upload error:", error);
    }
  };

  return (
    <>
      <button
        onClick={isRecording ? stopRecording : startRecording}
        type="button"
        className="bg-red-500 w-8 h-8 rounded-full relative overflow-hidden"
      >
        {isRecording ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <video
              src="https://cdnl.iconscout.com/lottie/premium/preview-watermark/microphone-7369708-6019229.mp4"
              alt="Recording"
              className="w-8 h-8"
            />
          </div>
        ) : (
          <i
            className={`fa ${
              isRecording ? "fa-stop" : "fa-microphone"
            } text-white`}
          ></i>
        )}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </>
  );
}

export default RecorderJSDemo;
