import React from "react";
import SidebarTest from "../../Components/User/Sidebar/SidebarTest";
import Map from "../../Components/User/NearByUsers/Map";

function NearbyUsers() {
  return (
    <div>
    <div className="float-left fixed">
      <SidebarTest />
    </div>

    <div style={{ marginLeft: "240px" }}>
      <Map />
    </div>
  </div>
  );
}

export default NearbyUsers;
