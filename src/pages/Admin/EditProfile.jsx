import React from "react";
import EditProfile from "../../Components/User/Profile/EditProfile";
import SidebarTest from "../../Components/User/Sidebar/SidebarTest";

function EditUserProfile() {
  return (
    <div className="flex">
    <div className="w-[300px] fixed h-screen">
      <SidebarTest />
    </div>
    <div className="ml-[300px] w-full h-screen overflow-y-auto mt-4 p-4">
      <EditProfile />
    </div>
  </div>
  );
}

export default EditUserProfile;
