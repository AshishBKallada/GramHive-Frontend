import React from "react";
import Profile from "../../Components/User/Profile/Profile";
import SidebarTest from "../../Components/User/Sidebar/SidebarTest";

function UserProfile() {
  return (
    <div>
      <div className="float-left fixed">
        <SidebarTest />
      </div>
      <div style={{ marginLeft: "200px" }}>
        <Profile />
      </div>
    </div>
  );
}

export default UserProfile;
