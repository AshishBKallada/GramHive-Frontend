import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-70 z-50">
      <div className="relative">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500"></div>
        <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
          <img
            src="https://media2.giphy.com/media/SnhVfcLN6DMdYJADWf/200w.gif?cid=6c09b95241t19gybjaie565b81cdn1vgqcw3ystdrtrkqkml&ep=v1_gifs_search&rid=200w.gif&ct=g"
            className="rounded-full h-28 w-28"
            alt="Loading..."
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
