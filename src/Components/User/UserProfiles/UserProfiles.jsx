import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Followers from '../Follower/Follower';
import { useNavigate } from 'react-router-dom';
import MyComponent from '../PostDetail/PostDetails';
import { getProfile } from '../../../services/services';


function UserProfiles({ userData }) {
  const follower_id = useSelector((state) => state.user.user._id)
  const follower_name = useSelector((state) => state.user.user.username)

  const [user, setUser] = useState(null)
  const [isFollowing, setIsFollowing] = useState(false)
  const [showFollowDiv, setShowFollowDiv] = useState(false);
  const [showFollowingDiv, setShowFollowingDiv] = useState(false)

  const [posts,setPosts] = useState([]);
  const [postDetails,setpostDetails] = useState(false);
  const [post,setPost] = useState([])

  const followersRef = useRef(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (userData) {
      setUser(userData);
      if (userData.followers.some(follower => follower._id === follower_id)) {
        setIsFollowing(true);
      }
    }

    const handleClickOutside = (event) => {
      if (followersRef.current && !followersRef.current.contains(event.target)) {
        setShowFollowDiv(false);
        setShowFollowingDiv(false)
      }
  };
  document.addEventListener('mousedown', handleClickOutside)
  return () => {
      document.removeEventListener('mousedown', handleClickOutside);
  };
  }, [userData]);


  const handleFollow = async () => {
    try {
      console.log('follower_id', user.user._id)
      const response = await fetch('http://localhost:3000/profile/followuser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ follower_id: user.user._id, followed_id: follower_id })
      })
      if (response.ok) {
        const updatedUser = { ...user };
        updatedUser.followers.push({ _id: follower_id });
        setUser(updatedUser);
        setIsFollowing(true);
        toast.success(`Followed ${user.user.username} successfully`);
      }
    } catch (error) {
      console.error('Error following user:', error);
    }
  }

  const handleUnfollow = async () => {
    try {
      const response = await fetch('http://localhost:3000/profile/unfollowuser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ follower_id: user.user._id, followed_id: follower_id })
      })
      if (response.ok) {
        const updatedUser = { ...user };
        updatedUser.followers = updatedUser.followers.filter(follower => follower._id !== follower_id);
        setUser(updatedUser);
        setIsFollowing(false);
        toast.error(`Unfollowed ${user.user.username} successfully`);
      }
    } catch (error) {
      console.error('Error unfollowing user:', error);
    }
  }

  const handleFollowers = () => {
    setShowFollowDiv(prev => !prev)
  }


  
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('1');
        const userId = user.user._id;
        console.log('User', userId);
        const response = await getProfile(userId)
        if (response.status === 200) {
          console.log('true', response);
          const data = await response.data;
          console.log('Data', data);
          
          setPosts(data.posts);
        } else {
          console.log('error',response);
          console.error('Failed to fetch data:', response.statusText);
          const errorData = await response;
          if (response.status === 403 && errorData.message === 'User is blocked') {
            Cookies.remove('token');
            toast.error('Your account has been blocked. Please contact support.', {
                onClose: () => navigate('/')
              });
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

   

  }, [user, navigate]);
console.log('POSTS',posts);

const handlePostDetails = (post) =>{
    console.log('1111111111',post);
    setpostDetails(prev=>!prev);
    setPost(post);
    console.log('2334',post);
}

  return (
    <div>
            {postDetails && <MyComponent user={user} post={post} setpostDetails={setpostDetails} />}

      <div ref={followersRef}>
        {showFollowDiv && user.followers.length>0 &&(
          <Followers type={'Followers'} users={user.followers} following={user.following} />
        )}
        {showFollowingDiv && (
          <Followers type={'Following'} users={user.following} />
        )}
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
      />
      <div className="insta-clone">
        {/* <nav className="bg-white shadow px-48 border-b border-gray-400">
          <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex px-2 lg:px-0">
                <div className="flex-shrink-0 flex items-center">
                  <img
                    className="block lg:hidden h-8 w-auto"
                    src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                    alt="Workflow logo"
                  />
                  <img
                    className="hidden lg:block h-8 w-auto"
                    src="https://fontmeme.com/permalink/240410/921064cd21a38f61c2f581450ded4de3.png"
                    alt="Workflow logo"
                  />
                </div>
              </div>
              <div className="flex-1 flex items-center justify-center px-2 lg:ml-12">
                <div className="max-w-lg w-full lg:max-w-xs">
                  <label for="search" className="sr-only">Search</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fill-rule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      id="search"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-400 rounded-md leading-5 bg-gray-100 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-blue-300 focus:shadow-outline-blue sm:text-sm transition duration-150 ease-in-out"
                      placeholder="Search"
                      type="search"
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center lg:hidden">

                <button
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                  aria-label="Main menu"
                  aria-expanded="false"
                >

                  <svg className="block h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>

                  <svg className="hidden h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="lg:ml-4 lg:flex lg:items-center">
                <button
                  className="flex-shrink-0 p-1 border-transparent text-gray-700 rounded-full hover:text-gray-600 focus:outline-none focus:text-gray-600 transition duration-150 ease-in-out"
                  aria-label="Notifications"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </button>

                <button
                  className="flex-shrink-0 p-1 border-transparent text-gray-700 rounded-full hover:text-gray-600 focus:outline-none focus:text-gray-600 transition duration-150 ease-in-out"
                  aria-label="Notifications"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z"
                    />
                  </svg>
                </button>

                <button
                  className="flex-shrink-0 p-1 border-transparent text-gray-700 rounded-full hover:text-gray-600 focus:outline-none focus:text-gray-600 transition duration-150 ease-in-out"
                  aria-label="Notifications"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </button>

                <button
                  className="flex-shrink-0 p-1 border-transparent text-gray-700 rounded-full hover:text-gray-600 focus:outline-none focus:text-gray-600 transition duration-150 ease-in-out"
                  aria-label="Notifications"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>

                <div className="ml-4 relative flex-shrink-0">
                  <div>
                    <button
                      className="flex rounded-full border-gray-700 transition duration-150 ease-in-out"
                      id="user-menu"
                      aria-label="User menu"
                      aria-haspopup="true"
                    >
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://scontent-muc2-1.cdninstagram.com/v/t51.2885-19/s150x150/58468664_291773768419326_7460980271920185344_n.jpg?_nc_ht=scontent-muc2-1.cdninstagram.com&amp;_nc_ohc=16Or2MWYINEAX9vLBW0&amp;oh=ada3818c35cb64180cf431d820d9dabe&amp;oe=5EF26035"
                        alt
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav> */}

        <div className="bg-gray-100 h-auto px-48">
          <div className="flex md:flex-row-reverse flex-wrap">
            <div className="w-full md:w-3/4 p-4 text-center">
              <div className="text-left pl-4 pt-3">
                <span className="text-base text-gray-700 text-2xl mr-2">{user && user.user.username}</span>


              </div>

              <div className="text-left pl-4 pt-3">
                <span className="text-base font-semibold text-gray-700 mr-2">
                  <b>220</b> posts
                </span>
                <span onClick={handleFollowers} className="text-base font-semibold text-gray-700 mr-2">
                  <b>{user && user.followers.length}</b> followers
                </span>
                <span onClick={() => setShowFollowingDiv(prev => !prev)} className="text-base font-semibold text-gray-700">
                  <b>{user && user.following.length}</b> following
                </span>
              </div>

              <div className="text-left pl-4 pt-3">
                <span className="text-lg font-bold text-gray-700 mr-2">{user && user.user.name}</span>
              </div>

              <div className="text-left pl-4 pt-3">
                <p
                  className="text-base font-medium text-blue-700 mr-2"
                >#graphicsdesigner #traveller #reader #blogger #digitalmarketer</p>
                <p
                  className="text-base font-medium text-gray-700 mr-2"
                >https://www.behance.net/hiravesona7855</p>

                <div className="mt-4">
                  {isFollowing ? (

                    <button onClick={handleUnfollow}
                      class="ml-2 w-[120px] select-none rounded-lg bg-gray-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                      type="button"
                    >
                      Following
                    </button>

                  ) : (
                    <button onClick={handleFollow}
                      class="w-[120px] select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                      type="button"
                    >
                      Follow
                    </button>
                  )}


                  <button
                    class="ml-2 w-[120px] select-none rounded-lg bg-gray-200 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-black shadow-md shadow-gray-500/20 transition-all hover:shadow-lg hover:shadow-gray-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                  >
                    message
                  </button>
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/4 p-4 text-center">
              <div className="w-full relative md:w-3/4 text-center mt-8">
                <button
                  className="flex rounded-full"
                  id="user-menu"
                  aria-label="User menu"
                  aria-haspopup="true"
                >
                  <img
    className="h-40 w-40 rounded-full border-2 shadow-gray-500 shadow-xl"
    src={user && user.user.image}
                    alt={user && user.user.username}
                  />

                </button>
              </div>
            </div>
          </div>


          <div className="inline-flex ml-36 mt-16">
            <div className="flex-1 text-center px-4 py-2 m-2">
              <div
                className="relative shadow-xl mx-auto h-24 w-24 -my-12 border-white rounded-full overflow-hidden border-4"
              >
                <img
                  className="object-cover w-full h-full"
                  src="https://images.unsplash.com/photo-1502164980785-f8aa41d53611?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80"
                />
              </div>
              <h1 className="pt-16 text-base font-semibold text-gray-900">Fun</h1>
            </div>

            <div className="flex-1 text-center px-4 py-2 m-2">
              <div
                className="relative shadow-xl mx-auto h-24 w-24 -my-12 border-white rounded-full overflow-hidden border-4"
              >
                <img
                  className="object-cover w-full h-full"
                  src="https://images.unsplash.com/photo-1456415333674-42b11b9f5b7b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80"
                />
              </div>
              <h1 className="pt-16 text-base font-semibold text-gray-900">Travel</h1>
            </div>

            <div className="flex-1 text-center px-4 py-2 m-2">
              <div
                className="relative shadow-xl mx-auto h-24 w-24 -my-12 border-white rounded-full overflow-hidden border-4"
              >
                <img
                  className="object-cover w-full h-full"
                  src="https://images.unsplash.com/photo-1494972308805-463bc619d34e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1052&q=80"
                />
              </div>
              <h1 className="pt-16 text-base font-semibold text-gray-900">Food</h1>
            </div>

            <div className="flex-1 text-center px-4 py-2 m-2">
              <div
                className="relative shadow-xl mx-auto h-24 w-24 -my-12 border-white rounded-full overflow-hidden border-4"
              >
                <img
                  className="object-cover w-full h-full"
                  src="https://images.unsplash.com/photo-1516834474-48c0abc2a902?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1053&q=80"
                />
              </div>
              <h1 className="pt-16 text-base font-semibold text-gray-900">Sketch</h1>
            </div>

            <div className="flex-1 text-center px-4 py-2 m-2">
              <div
                className="relative shadow-xl mx-auto h-24 w-24 -my-12 border-white rounded-full overflow-hidden border-4"
              >
                <img
                  className="object-cover w-full h-full"
                  src="https://images.unsplash.com/photo-1444021465936-c6ca81d39b84?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80"
                />
              </div>
              <h1 className="pt-16 text-base font-semibold text-gray-900">My Work</h1>
            </div>
          </div>

          <hr className="border-gray-500 mt-6" />
          <hr className="border-gray-500 w-20 border-t-1 ml-64 border-gray-800" />

          <div className="flex flex-row mt-4 justify-center mr-16">
            <div className="flex text-gray-700 text-center py-2 m-2 pr-5">
              <div className="flex inline-flex">
                <button
                  className="border-transparent text-gray-800 rounded-full hover:text-blue-600 focus:outline-none focus:text-gray-600"
                  aria-label="Notifications"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex inline-flex ml-2 mt-1">
                <h3 className="text-sm font-bold text-gray-800 mr-2">POSTS</h3>
              </div>
            </div>

            <div className="flex text-gray-700 text-center py-2 m-2 pr-5">
              <div className="flex inline-flex">
                <button
                  className="border-transparent text-gray-600 rounded-full hover:text-blue-600 focus:outline-none focus:text-gray-600"
                  aria-label="Notifications"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex inline-flex ml-2 mt-1">
                <h3 className="text-sm font-medium text-gray-700 mr-2">IGTV</h3>
              </div>
            </div>

            <div className="flex text-gray-700 text-center py-2 m-2 pr-5">
              <div className="flex inline-flex">
                <button
                  className="border-transparent text-gray-600 rounded-full hover:text-blue-600 focus:outline-none focus:text-gray-600"
                  aria-label="Notifications"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                </button>
              </div>
              <div className="flex inline-flex ml-2 mt-1">
                <h3 className="text-sm font-medium text-gray-700 mr-2">SAVED</h3>
              </div>
            </div>

            <div className="flex text-gray-700 text-center py-2 m-2 pr-5">
              <div className="flex inline-flex">
                <button
                  className="border-transparent text-gray-600 rounded-full hover:text-blue-600 focus:outline-none focus:text-gray-600"
                  aria-label="Notifications"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex inline-flex ml-2 mt-1">
                <h3 className="text-sm font-medium text-gray-700 mr-2">TAGGED</h3>
              </div>
            </div>
          </div>



          <div>
                    {posts.map((post, index) => (
  index % 3 === 0 && ( 
    <div key={index / 3} className="flex pt-4">
      {posts.slice(index, index + 3).map((post, idx) => (
        <div key={index + idx} className="flex-1 text-center relative px-4 py-2 m-2" onClick={() => handlePostDetails(post)}>
          {post.images.length > 1 && ( 
            <div className="absolute top-2 right-2 bg-white rounded-full w-6 h-6 flex items-center justify-center">
              <span className="text-gray-500">+{post.images.length - 1}</span> 
            </div>
          )}
          <img 
            className="w-full h-auto" 
            src={post.images[0]} 
            alt={`Post ${index + idx}`} 
          />
        </div>
      ))}
    </div>
  )
))}



</div>
        </div>
      </div>
    </div>
  )
}

export default UserProfiles
