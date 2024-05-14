import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import React from "react";
import { useParams } from "react-router-dom";

function RoomPage() {
  const { roomId } = useParams();

  const myMeeting = async (element) => {
    const appId = 936448743;
    const serverSecret = "494beec4b3a9c89f5408d65b260c8b71";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appId,
      serverSecret,
      roomId,
      Date.now().toString(),
      "Ashish"
    );

    const zc = ZegoUIKitPrebuilt.create(kitToken);
    zc.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
    });
  };
  return <div ref={myMeeting}></div>;
}

export default RoomPage;
