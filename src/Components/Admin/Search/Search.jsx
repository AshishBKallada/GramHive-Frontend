import React from 'react'

function Search({handleSearch}) {
  return (
    <div>
       <div className="flex items-center p-4 space-x-4 bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-500">
              <div className="flex bg-gray-100 p-3 w-56 space-x-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input className="bg-gray-100 outline-none text-sm" type="text" onChange={handleSearch} placeholder="Search a user ..." />
              </div>
              <div className="flex py-2 px-3 rounded-lg text-gray-500 font-semibold cursor-pointer text-sm">
                <span>All categories</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <div className="bg-gray-800 py-2 px-3 text-white font-semibold rounded-lg hover:shadow-lg transition duration-3000 cursor-pointer text-sm">
                <span>Search</span>
              </div>
            </div>
    </div>
  )
}

export default Search
