import React from "react";
import Sidebar from "../../Components/Admin/Sidebar/Sidebar";
import Header from "../../Components/Admin/Header/Header";
import FeedBackCards from "../../Components/Admin/Feedback/FeedBackCards";

function Feedbacks() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          overflowX: "hidden",
        }}
      >
       
        <div style={{ flex: 1, overflowY: "auto" }}>
          <FeedBackCards />
        </div>
      </div>
    </div>
  );
}

export default Feedbacks;
