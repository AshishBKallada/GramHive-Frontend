import React from 'react';
import Sidebar from '../../Components/Admin/Sidebar/Sidebar';
import Dashboard from '../../Components/Admin/Dashboard/Dashboard';
import ChartOne from '../../Components/Admin/Charts/Chartone';
import ChartTwo from '../../Components/Admin/Charts/ChartTwo';
import Navbar from '../../Components/Admin/Header/Header';

function AdminHome() {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ marginLeft: '20px' }}>
        <div>
          <Navbar/>
        </div>
        <div>
          <Dashboard />
        </div>
        <div style={{ marginTop: '20px' ,display: 'flex' }}>
          <ChartOne />
          &nbsp;&nbsp;          &nbsp;&nbsp;
          &nbsp;&nbsp;

          <ChartTwo/>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
