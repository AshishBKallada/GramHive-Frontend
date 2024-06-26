import React from 'react';

function AdminLogoutLoading() {
  return (
    <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-black p-6 rounded-lg shadow-lg">
        <div className="flex flex-col items-center">
          <div className="animate-spin text-white text-4xl mb-4">
            <svg className="w-8 h-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354V1m0 22v-3.354M20.485 6.344l2.121-2.122M3.515 17.656l-2.121 2.122M23 12h-3.354M4.354 12H1m20.485 6.344l-2.122 2.122M6.344 3.515L4.222 5.637" />
            </svg>
          </div>
          <span className="text-white text-lg">Logging out...</span>
        </div>
      </div>
    </div>
  );
}

export default AdminLogoutLoading;
