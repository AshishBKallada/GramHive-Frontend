import React, { useContext, useEffect, useRef, useState } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useSelector } from "react-redux";
import { addLiveStream, removeLiveStream } from "../../../services/services";
import { SocketContext } from "../../../Context/socketContext";

function randomID(len) {
  let result = "";
  const chars = "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP";
  for (let i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function getUrlParams(url = window.location.href) {
  const urlParams = new URLSearchParams(url.split("?")[1]);
  return urlParams;
}

export default function LiveSetup() {
  const socket = useContext(SocketContext);
  const [isLiveStreaming, setIsLiveStreaming] = useState(false);
  const userId = useSelector((state) => state.user.user._id);
  const roomID = getUrlParams().get("roomID") || "xYcf45";

  let role_str = getUrlParams().get("role") || "Host";
  const role =
    role_str === "Host"
      ? ZegoUIKitPrebuilt.Host
      : role_str === "Cohost"
      ? ZegoUIKitPrebuilt.Cohost
      : ZegoUIKitPrebuilt.Audience;

  const sharedLinks = [
    {
      name: role === ZegoUIKitPrebuilt.Host || role === ZegoUIKitPrebuilt.Cohost ? "Join as co-host" : "Join as audience",
      url:
        window.location.protocol +
        "//" +
        window.location.host +
        window.location.pathname +
        "?roomID=" +
        roomID +
        `&role=${role === ZegoUIKitPrebuilt.Host || role === ZegoUIKitPrebuilt.Cohost ? "Cohost" : "Audience"}`,
    }
  ];

  const appID = 1453958903;
  const serverSecret = "d02b68a0673fa35937fb45598740f6f3";
  const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
    appID,
    serverSecret,
    roomID,
    randomID(5),
    randomID(5)
  );

  const myMeeting = useRef(null);

  useEffect(() => {
    const zp = ZegoUIKitPrebuilt.create(kitToken);

    if (role === ZegoUIKitPrebuilt.Host || role === ZegoUIKitPrebuilt.Cohost) {
      setIsLiveStreaming(true);
      const liveStreamData = {
        userId,
        roomID,
      };
      socket.emit("userStartLive", liveStreamData);
      addLiveStream(liveStreamData);
    }

    zp.joinRoom({
      container: myMeeting.current,
      scenario: {
        mode: ZegoUIKitPrebuilt.LiveStreaming,
        config: {
          role,
        },
      },
      sharedLinks,
    });

    return () => {
      if (role === ZegoUIKitPrebuilt.Host || role === ZegoUIKitPrebuilt.Cohost) {
        handleStopLiveStream();
      }
    };
  }, [kitToken, role, roomID, socket, userId]);

  const handleStopLiveStream = async () => {
    const liveStreamData = {
      userId,
      roomID,
    };
    await removeLiveStream(liveStreamData.userId);
    socket.emit("userStopLive", liveStreamData);
    setIsLiveStreaming(false);
  };

  return (
    <div className="myCallContainer" ref={myMeeting} style={{ width: "100vw", height: "100vh" }}>
      {isLiveStreaming && (
        <button onClick={handleStopLiveStream}>Stop Live Stream</button>
      )}
    </div>
  );
}
