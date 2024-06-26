import React from 'react';

function Dashboard({ data }) {
  return (
    <div className="px-4 sm:px-8 mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="flex items-center bg-gray-900 border rounded-lg overflow-hidden shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105">
          <div className="p-6 bg-green-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <div className="px-6 py-4 text-white">
            <h3 className="text-lg tracking-wider">Total Users</h3>
            <p className="text-4xl">{data?.totalUsers}</p>
          </div>
        </div>

        <div className="flex items-center bg-gray-900 border rounded-lg overflow-hidden shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105">
          <div className="p-6 bg-blue-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <div className="px-6 py-4 text-white">
            <h3 className="text-lg tracking-wider">Online Users</h3>
            <p className="text-4xl">39,265</p>
          </div>
        </div>

        <div className="flex items-center bg-gray-900 border rounded-lg overflow-hidden shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105">
          <div className="p-6 bg-indigo-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
            </svg>
          </div>
          <div className="px-6 py-4 text-white">
            <h3 className="text-lg tracking-wider">Total Revenue</h3>
            <p className="text-4xl">{data?.totalRevenue}</p>
          </div>
        </div>

        <div className="flex items-center bg-gray-900 border rounded-lg overflow-hidden shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105">
          <div className="p-6 bg-red-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
            </svg>
          </div>
          <div className="px-6 py-4 text-white">
            <h3 className="text-lg tracking-wider">Server Load</h3>
            <p className="text-4xl">34.12%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
