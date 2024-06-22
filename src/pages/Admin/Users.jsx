import React from "react";
import Sidebar from "../../Components/Admin/Sidebar/Sidebar";
import UserTable from "../../Components/Admin/UserTable/UserTable";

function Users() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <div className="bg-black" style={{ flex: 1, overflowY: "auto" }}>
        <UserTable />
      </div>
    </div>
  );
}

export default Users;
