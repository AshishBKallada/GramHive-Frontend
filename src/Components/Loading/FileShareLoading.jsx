import React from "react";

function FileShareLoading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="bg-white rounded-xl p-6 shadow-lg flex flex-col items-center justify-center">
        <img
          src="https://cdn.dribbble.com/users/2760451/screenshots/5667639/file-transfer.gif"
          alt="Loading..."
          className="h-44 w-72 rounded-xl"
        />
        <p className="text-gray-800">This may take a few seconds . . . </p>
      </div>
    </div>
  );
}

export default FileShareLoading;
