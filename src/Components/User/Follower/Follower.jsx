import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { followUser, unfollowUser } from '../../../services/services';


const Followers = ({ type, users, setFollowers, following, setFollowing, showRemove }) => {
  const userId = useSelector((state) => state.user.user._id);
  const [userType] = useState(type);
  const [usersData, setUsersData] = useState(users);


  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    if (query.trim() === '') {
      setUsersData(users);
    } else {
      const updatedData = users.filter((user) => user.username.toLowerCase().includes(query));
      setUsersData(updatedData);
    }
  }

  const handleUserFollow = async (follower_id, follower_name) => {
    try {
      const response = await followUser(follower_id, userId)
      if (response.status === 200) {
        setFollowing([...following, { _id: follower_id }]);
        toast.success(`Followed ${follower_name} successfully`, { autoClose: 1000 });

      }
    } catch (error) {
      console.error('Error following user:', error);
    }
  }
  const handleUserUnFollow = async (follower_id, follower_name) => {
    try {
      const response = await unfollowUser(follower_id,userId)
      if (response.status === 200) {
        if (following.length > 0) {
          const updatedFollowing = following.filter(user => user._id !== follower_id);
          setFollowing(updatedFollowing);
        }
        toast.error(`Unfollowed ${follower_id} successfully`, { autoClose: 1000 });


      }
    } catch (error) {
      console.error('Error unfollowing user:', error);
    }
  }

  const handleFollowerRemove = async (follower_id, follower_name) => {
    try {
      const response = await fetch('https://gramhive6.vercel.app/profile/unfollowuser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ follower_id: userId, followed_id: follower_id })
      });
      if (response.ok) {
        console.log('USER REMOVED SUCCESSFUL', follower_id);
        const updatedUsers = users.filter(user => user._id !== follower_id)
        setUsersData(updatedUsers);
        setFollowers(updatedUsers)

      }
      toast.success(`Removed ${follower_name} successfully`, { autoClose: 1000 });

    } catch (error) {
      console.error('Error removing user:', error);

    }
  }

  return (
    
    <div className='fixed flex flex-col items-center justify-center min-h-screen z-50'>
      <ToastContainer />
      <div className='user-list w-lg max-w-lg mx-auto bg-white rounded-xl shadow-xl flex flex-col py-4 border-black'>
        <div className='w-full mx-auto'>
          <h1 className="ml-32 title font-medium">{userType}</h1>
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
          {usersData.map(user => (
            <div key={user.id} className="user-row flex flex-col items-center justify-between cursor-pointer p-4 duration-300 sm:flex-row sm:py-4 sm:px-8 hover:bg-[#f6f8f9]">
              <Link to={`/userprofile/${user._id}`}>
                <div className="user flex items-center text-center flex-col sm:flex-row sm:text-left">
                  <div className="avatar-content mb-2.5 sm:mb-0 sm:mr-2.5">
                    <img className="avatar w-14 h-14 rounded-full" src={user.image} alt="User Avatar" />
                  </div>
                  <div className="user-body flex flex-col mb-4 sm:mb-0 sm:mr-4">
                    <a href="#" className="title font-medium no-underline">{user.username}</a>
                    <div className="skills flex flex-col">
                      <span className="subtitle text-slate-500">{user.name}</span>
                    </div>
                  </div>
                </div>
              </Link>
              <div className="user-option mx-auto sm:ml-auto sm:mr-0">
                {userType === 'Followers' ? (
                  following && following.some(followedUser => followedUser._id === user._id) ? (
                    <div>
                      <button onClick={() => handleUserUnFollow(user._id, user.username)} className="btn inline-block select-none no-underline align-middle cursor-pointer whitespace-nowrap px-4 py-1.5 rounded text-base font-medium leading-6 tracking-tight text-black text-center border-0 bg-gray-300 hover:bg-red-500 hover:text-white duration-300" style={{ width: '100px' }} type="button">
                        Following
                      </button>
                      {showRemove &&
                        <button className="ml-2 btn inline-block select-none no-underline align-middle cursor-pointer whitespace-nowrap px-4 py-1.5 rounded text-base font-medium leading-6 tracking-tight text-white text-center border-0 bg-red-500 hover:bg-red-800 duration-300" style={{ width: '100px' }} type="button">
                          Remove
                        </button>
                      }
                    </div>
                  ) : (
                    <div>
                      <button onClick={() => handleUserFollow(user._id, user.username)} className="btn inline-block select-none no-underline align-middle cursor-pointer whitespace-nowrap px-4 py-1.5 rounded text-base font-medium leading-6 tracking-tight text-white text-center border-0 bg-blue-500 hover:bg-blue-800 duration-300" style={{ width: '100px' }} type="button" onClick={() => handleUserFollow(user._id)}>
                        Follow
                      </button>
                      {showRemove &&
                        <button onClick={()=>handleFollowerRemove(user._id,user.username)} className="ml-2 btn inline-block select-none no-underline align-middle cursor-pointer whitespace-nowrap px-4 py-1.5 rounded text-base font-medium leading-6 tracking-tight text-white text-center border-0 bg-red-500 hover:bg-red-800 duration-300" style={{ width: '100px' }} type="button">
                          Remove
                        </button>
                      }
                    </div>
                  )
                ) : (
                  <button onClick={() => handleUserUnFollow(user._id, user.username)} className="btn inline-block select-none no-underline align-middle cursor-pointer whitespace-nowrap px-4 py-1.5 rounded text-base font-medium leading-6 tracking-tight text-white text-center border-0 bg-red-500 hover:bg-red-800 duration-300" style={{ width: '100px' }} type="button">
                    Following
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div >
  );
}

export default Followers;
