import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/Admin/Sidebar/Sidebar";
import Dashboard from "../../Components/Admin/Dashboard/Dashboard";
import ChartOne from "../../Components/Admin/Charts/Chartone";
import ChartTwo from "../../Components/Admin/Charts/ChartTwo";
import { fetchChartOneData, fetchChartTwoData, fetchDashboardData } from "../../services/adminServices";

function AdminHome() {
  const [dashboardData, setDashboardData] = useState(null);
  const [chartOneData, setChartOneData] = useState(null);
  const [chartTwoData, setChartTwoData] = useState(null);

  useEffect(() => {
    const loadDashBoardData = async () => {
      try {
        const data = await fetchDashboardData();
        setDashboardData(data);
      } catch (error) {
        console.error(error);
      }
    };
    const loadChartOneData = async () => {
      try {
        const data = await fetchChartOneData();
        setChartOneData(data);
      } catch (error) {
        console.error(error);
      }
    };
    const loadChartTwoData = async () => {
      try {
        const data = await fetchChartTwoData();
        setChartTwoData(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadDashBoardData();
    loadChartOneData();
    loadChartTwoData();
  }, []);
  return (
    <div className="bg-black flex lg:flex-row min-h-screen">
      <Sidebar />
      <div className="flex-1 p-5">
        <Dashboard data={dashboardData} />
        <div className="mt-5 flex flex-col space-y-5 lg:flex-row lg:space-y-0 lg:space-x-5">
          <div className="flex-1">
            <ChartOne />
          </div>
          <div className="flex-1">
            <ChartTwo />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
