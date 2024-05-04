import React, { useState } from 'react';
import { Link } from 'react-router-dom';


function LikedList({ likes, closemodal }) {

    const [Likes,setLikes] = useState(likes)
    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        if (query.trim() === '') {
          setLikes(likes);
        } else {
          const updatedLikes = likes.filter((like) => like.user.username.toLowerCase().includes(query));
          setLikes(updatedLikes);
        }
      }
    return (
        <div className='fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50'>
            <div className='user-list w-full max-w-md bg-white rounded-xl shadow-xl flex flex-col'>

                <div className='px-4 py-4'> <div className='flex justify-end'>
                    <button onClick={() => closemodal(false)} className="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                    <h1 className="text-xl font-bold text-center">Likes</h1>
                    <div className="mt-2 relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden border-t border-gray-300">
                        <div className="grid place-items-center h-full w-12 text-gray-300 bg-gray-100">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                          onChange={handleSearch}
                            className="peer h-full w-full outline-none bg-gray-100 text-sm text-gray-700 pr-2"
                            type="text"
                            id="search"
                            placeholder="Search a user.." />
                    </div>
                </div>
                <div className=' overflow-y-auto max-h-60'>

                {Likes && Likes.map((like) => (


                    <div className="user-row flex flex-col items-center justify-between cursor-pointer p-4 duration-300 sm:flex-row sm:py-4 sm:px-8 hover:bg-[#f6f8f9]">
                        <Link to={`/userprofile/${like.user._id}`}>
                            <div className="user flex items-center text-center flex-col sm:flex-row sm:text-left">
                                <div className="avatar-content mb-2 sm:mb-0 sm:mr-2">
                                    <img className="avatar w-16 h-16 rounded-full" src={like.user.image} alt="Avatar" />
                                </div>
                                <div className="user-body flex flex-col mb-4 sm:mb-0 sm:mr-4">
                                    <a href="#" className="title font-medium no-underline">{like.user.username}</a>
                                    <div className="skills flex flex-col">
                                        <span className="subtitle text-slate-500">{like.user.name}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                       

                    </div>
                ))}
                </div>
            </div>
        </div>
    );
}

export default LikedList;
