import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/User/Sidebar/Sidebar";
import Story from "../../Components/User/Story/Story";
import { CardStackDemo } from "../../Components/User/stackCard/stackCard";
const PostCard = React.lazy(() =>
  import("../../Components/User/PostCard/PostCard")
);

function Home() {
  return (
    <div className="" style={{ position: "relative" }}>
      <Sidebar />
      <div className="w-[60%] ml-[20%] z-10 ">
        <Story />
      </div>

     
      <div
  className="scroll-smooth static overflow-scroll"
  style={{
    display: "flex",
    marginLeft: "400px",
    overflowY: "scroll",
    height: "calc(100vh - 8rem)",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
  }}
>
  <div style={{ flex: "1 1 auto", marginRight: "16px" }}>
    <PostCard />
  </div>
  <div style={{ flex: "0 0 auto", position: "sticky", top: "0" }}>
    <CardStackDemo />
  </div>
</div>


    </div>
  );
}

export default Home;
