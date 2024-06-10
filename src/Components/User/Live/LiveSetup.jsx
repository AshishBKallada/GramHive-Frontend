import * as React from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import { useState } from "react";
import { useEffect } from "react";
import { addLiveStream, removeLiveStream } from "../../../services/services";

const ENDPOINT = "http://localhost:3000";
var socket;
function randomID(len) {
  let result = "";
  if (result) return result;
  var chars = "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP",
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(url = window.location.href) {
  let urlStr = url.split("?")[1];
  return new URLSearchParams(urlStr);
}

export default function LiveSetup() {
  const [isLiveStreaming, setIsLiveStreaming] = useState(false);

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", userId);
    socket.on("connected", () => console.log("Connected to socket server"));
  }, []);

  const userId = useSelector((state) => state.user.user._id);

  // const roomID = getUrlParams().get("roomID") || randomID(5);
  const roomID = "xYcf45";

  let role_str = getUrlParams(window.location.href).get("role") || "Host";
  const role =
    role_str === "Host"
      ? ZegoUIKitPrebuilt.Host
      : role_str === "Cohost"
      ? ZegoUIKitPrebuilt.Cohost
      : ZegoUIKitPrebuilt.Audience;

  let sharedLinks = [];
  if (role === ZegoUIKitPrebuilt.Host || role === ZegoUIKitPrebuilt.Cohost) {
    sharedLinks.push({
      name: "Join as co-host",
      url:
        window.location.protocol +
        "//" +
        window.location.host +
        window.location.pathname +
        "?roomID=" +
        roomID +
        "&role=Cohost",
    });
  }
  sharedLinks.push({
    name: "Join as audience",
    url:
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname +
      "?roomID=" +
      roomID +
      "&role=Audience",
  });

  const appID = 1453958903;
  const serverSecret = "d02b68a0673fa35937fb45598740f6f3";
  const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
    appID,
    serverSecret,
    roomID,
    randomID(5),
    randomID(5)
  );

  let myMeeting = async (element) => {
    const zp = ZegoUIKitPrebuilt.create(kitToken);

    if (role === ZegoUIKitPrebuilt.Host || role === ZegoUIKitPrebuilt.Cohost) {
      setIsLiveStreaming(true);
      const liveStreamData = {
        userId,
        roomID,
      };
      socket.emit("userStartLive", { userId, roomID });
      await addLiveStream(liveStreamData);

    }
    zp.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.LiveStreaming,
        config: {
          role,
        },
      },
      sharedLinks,
    });
  };
  const handleStopLiveStream = async () => {
    if (liveStreamData) {
      await removeLiveStream(liveStreamData.userId);
    }
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
