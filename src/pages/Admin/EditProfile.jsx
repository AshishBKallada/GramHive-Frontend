import React from "react";
import EditProfile from "../../Components/User/Profile/EditProfile";
import SidebarTest from "../../Components/User/Sidebar/SidebarTest";

function EditUserProfile() {
  return (
    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start">
      <div className="lg:max-w-[300px] w-full lg:w-auto">
        <SidebarTest />
      </div>
      <div className="flex-1 lg:ml-4 mt-8 lg:mt-0">
        <EditProfile />
      </div>
    </div>
  );
}

export default EditUserProfile;
