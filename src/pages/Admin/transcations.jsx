import React from "react";
import Transactions from "../../Components/Admin/Transactions/Transactions";
import Sidebar from "../../Components/Admin/Sidebar/Sidebar";

function TransactionsPage() {
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
         <div className="sm:flex sm:items-center sm:justify-between flex-col sm:flex-row bg-black">
        <p className="flex-1 text-4xl font-bold text-gray-300 ml-12 mt-4">
          Latest Payments
        </p>
      </div>
        <div className="bg-black" style={{ flex: 1, overflowY: "auto" }}>
          <Transactions />
        </div>
      </div>
    </div>
  );
}

export default TransactionsPage;
