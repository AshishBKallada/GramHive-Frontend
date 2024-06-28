import React from "react";
import EditProfile from "../../Components/User/Profile/EditProfile";
import SidebarTest from "../../Components/User/Sidebar/SidebarTest";

function EditUserProfile() {
  return (
    <>
      <div className="flex max-w-[300px]">
        <SidebarTest />
      </div>
      <div style={{ marginTop: "100px" }}>
        <EditProfile />
      </div>
    </>
  );
}

export default EditUserProfile;
