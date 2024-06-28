import React from "react";
import EditProfile from "../../Components/User/Profile/EditProfile";
import SidebarTest from "../../Components/User/Sidebar/SidebarTest";

function EditUserProfile() {
  return (
    <div>
    <div className="float-left fixed">
      <SidebarTest />
    </div>

    <div style={{ marginLeft: "200px" }}>
      <EditProfile />
    </div>
  </div>
  );
}

export default EditUserProfile;
