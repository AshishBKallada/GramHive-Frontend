import React from "react";
import UserReports from "../../Components/Admin/Reports/User/UserReports";
import Sidebar from "../../Components/Admin/Sidebar/Sidebar";

function UserReportsPage() {
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
          <UserReports />
        </div>
      </div>
    </div>
  );
}

export default UserReportsPage;
