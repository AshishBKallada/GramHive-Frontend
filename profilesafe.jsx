import React from 'react';

function LikedList() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-16 bg-slate-200 relative'>
      <div className='user-list w-full max-w-md mx-auto bg-white rounded-xl shadow-xl flex flex-col py-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
      <div className='w-full mx-auto'>
      <h1 className="text-xl font-bold text-center ">Likes</h1>
          <div className="mt-2 relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden border-t border-gray-300">
            <div className="grid place-items-center h-full w-12 text-gray-300 bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
             
              className="peer h-full w-full outline-none bg-gray-100 text-sm text-gray-700 pr-2"
              type="text"
              id="search"
              placeholder="Search a user.." />
          </div>
        </div>      
        <div className="user-row flex flex-col items-center justify-between cursor-pointer p-4 duration-300 sm:flex-row sm:py-4 sm:px-8 hover:bg-[#f6f8f9]">
          <div className="user flex items-center text-center flex-col sm:flex-row sm:text-left">
            <div className="avatar-content mb-2 sm:mb-0 sm:mr-2">
              <img className="avatar w-16 h-16 rounded-full" src="https://randomuser.me/api/portraits/men/32.jpg" alt="Avatar" />
            </div>
            <div className="user-body flex flex-col mb-4 sm:mb-0 sm:mr-4">
              <a href="#" className="title font-medium no-underline">iblameaah6</a>
              <div className="skills flex flex-col">
                <span className="subtitle text-slate-500">Ashish Benny Kallada</span>
              </div>
            </div>
          </div>
          <div className="user-option mx-auto sm:ml-auto sm:mr-0">
            <button className="btn inline-block select-none no-underline align-middle cursor-pointer whitespace-nowrap px-4 py-1.5 rounded text-base font-medium leading-6 tracking-tight text-white text-center border-0 bg-[#6911e7] hover:bg-[#590acb] duration-300" type="button">Follow</button>
          </div>
        </div>


        <div className="user-row flex flex-col items-center justify-between cursor-pointer p-4 duration-300 sm:flex-row sm:py-4 sm:px-8 hover:bg-[#f6f8f9]">
          <div className="user flex items-center text-center flex-col sm:flex-row sm:text-left">
            <div className="avatar-content mb-2 sm:mb-0 sm:mr-2">
              <img className="avatar w-16 h-16 rounded-full" src="https://randomuser.me/api/portraits/men/32.jpg" alt="Avatar" />
            </div>
            <div className="user-body flex flex-col mb-4 sm:mb-0 sm:mr-4">
              <a href="#" className="title font-medium no-underline">___ashixx___</a>
              <div className="skills flex flex-col">
                <span className="subtitle text-slate-500">Freddy John</span>
              </div>
            </div>
          </div>
          <div className="user-option mx-auto sm:ml-auto sm:mr-0">
            <button className="btn inline-block select-none no-underline align-middle cursor-pointer whitespace-nowrap px-4 py-1.5 rounded text-base font-medium leading-6 tracking-tight text-white text-center border-0 bg-[#6911e7] hover:bg-[#590acb] duration-300" type="button">Follow</button>
          </div>
        </div>

        

        


      </div>
    </div>
  );
}

export default LikedList;
