import React from "react";
import { ZIM } from "zego-zim-web";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

function Call2() {
  const userID = "Ashish";
  const userName = "userName" + userID;
  const appID = 936448743;
  const serverSecret = "494beec4b3a9c89f5408d65b260c8b71";
  const TOKEN = ZegoUIKitPrebuilt.generateKitTokenForTest(
    appID,
    serverSecret,
    null,
    userID,
    userName
  );

  const zp = ZegoUIKitPrebuilt.create(TOKEN);
  zp.addPlugins({ ZIM });

  function invite() {
    const targetUser = {
         userID:'',
         userName:''
     };
    zp.sendCallInvitation({
     callees: [targetUser],
     callType: ZegoUIKitPrebuilt.InvitationTypeVideoCall,
     timeout: 60, 
    }).then((res) => {
     console.warn(res);
    })
    .catch((err) => {
    console.warn(err);
    });
 }
  return (
    <div>
      <script src="https://unpkg.com/zego-zim-web@2.5.0/index.js"></script>
      <script src="https://unpkg.com/@zegocloud/zego-uikit-prebuilt/zego-uikit-prebuilt.js"></script>
      <button onclick="invite()">invite</button>
    </div>
  );
}

export default Call2;
