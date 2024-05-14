import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/User/Sidebar/Sidebar";
import Story from "../../Components/User/Story/Story";
const PostCard = React.lazy(() => import('../../Components/User/PostCard/PostCard'));

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
          marginLeft: "400px",
          height: "calc(100vh - 8rem)",
          overflowY: "scroll",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <PostCard />
      </div>
    </div>
  );
}

export default Home;
