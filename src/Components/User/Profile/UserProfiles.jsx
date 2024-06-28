import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Followers from "../Follower/Follower";
import { useNavigate } from "react-router-dom";
import MyComponent from "../Post/PostDetails";
import {
  followUser,
  getProfile,
  onFollowUser,
  unFollowUser,
} from "../../../services/services";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import { ReportModal } from "../Reports/reportModal";
import { io } from "socket.io-client";

function UserProfiles({ userData }) {
  const follower_id = useSelector((state) => state.user.user._id);

  const [user, setUser] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showFollowDiv, setShowFollowDiv] = useState(false);
  const [showFollowingDiv, setShowFollowingDiv] = useState(false);

  const [posts, setPosts] = useState([]);
  const [postDetails, setpostDetails] = useState(false);
  const [post, setPost] = useState([]);

  const followersRef = useRef(null);
  const navigate = useNavigate();

  const [reportModal, setReportModal] = useState(false);

  useEffect(() => {
    if (userData) {
      setUser(userData);
      if (userData.followers.some((follower) => follower._id === follower_id)) {
        setIsFollowing(true);
      }
    }

    const handleClickOutside = (event) => {
      if (
        followersRef.current &&
        !followersRef.current.contains(event.target)
      ) {
        setShowFollowDiv(false);
        setShowFollowingDiv(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userData]);

  const socket = io("https://bassheads.shop");

  const handleFollow = async () => {
    try {
      const response = await onFollowUser(user.user._id, follower_id);
      if (response.data) {
        console.log("notifiis", response.data.notification);
        const notification = response.data.notification;
        socket.emit("sentNotification", notification);

        const updatedUser = { ...user };
        updatedUser.followers.push({ _id: follower_id });

        setUser(updatedUser);
        setIsFollowing(true);

        toast.success(`Followed ${user.user.username} successfully`);
      }
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  const handleUnfollow = async () => {
    try {
      const response = await unFollowUser(user.user._id, follower_id);

      if (response.data.success) {
        const updatedUser = { ...user };
        updatedUser.followers = updatedUser.followers.filter(
          (follower) => follower._id !== follower_id
        );
        setUser(updatedUser);
        setIsFollowing(false);
        toast.error(`Unfollowed ${user.user.username} successfully`);
      }
    } catch (error) {
      console.error("Error unfollowing user:", error);
    }
  };

  const handleFollowers = () => {
    setShowFollowDiv((prev) => !prev);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("1");
        const userId = user.user._id;
        console.log("User", userId);
        const response = await getProfile(userId);
        if (response.status === 200) {
          console.log("true", response);
          const data = await response.data;
          console.log("Data", data);

          setPosts(data.posts);
        } else {
          console.log("error", response);
          console.error("Failed to fetch data:", response.statusText);
          const errorData = await response;
          if (
            response.status === 403 &&
            errorData.message === "User is blocked"
          ) {
            Cookies.remove("token");
            toast.error(
              "Your account has been blocked. Please contact support.",
              {
                onClose: () => navigate("/"),
              }
            );
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user, navigate]);

  const handlePostDetails = (post) => {
    setpostDetails((prev) => !prev);
    setPost(post);
  };

  return (
    <div>
      {reportModal && (
        <ReportModal
          type={"user"}
          Id={user.user._id}
          reportModal={reportModal}
          setReportModal={setReportModal}
        />
      )}
      {postDetails && (
        <MyComponent user={user} post={post} setpostDetails={setpostDetails} />
      )}

      <div ref={followersRef}>
        {showFollowDiv && user.followers.length > 0 && (
          <Followers
            type={"Followers"}
            users={user.followers}
            following={user.following}
          />
        )}
        {showFollowingDiv && (
          <Followers type={"Following"} users={user.following} />
        )}
      </div>

      <ToastContainer position="top-center" autoClose={2000} />

      <div className="insta-clone">
        <div className="bg-gray-100 h-auto px-48">
          <div className="flex md:flex-row-reverse flex-wrap">
            <div className="w-full md:w-3/4 p-4 text-center">
              <div className="text-left pl-4 pt-3 flex items-center">
                <span className="text-base text-gray-700 text-2xl mr-2">
                  {user && user.user.username}
                </span>
                <Menu>
                  <MenuHandler>
                    <Button className="ml-12 bg-blue-gray-50 text-black">
                      ...
                    </Button>
                  </MenuHandler>
                  <MenuList>
                    <MenuItem>Share</MenuItem>
                    <MenuItem>Block</MenuItem>
                    <MenuItem onClick={() => setReportModal((prev) => !prev)}>
                      Report
                    </MenuItem>
                  </MenuList>
                </Menu>
              </div>

              <div className="text-left pl-4 pt-3">
                <span className="text-base font-semibold text-gray-700 mr-2">
                  <b>220</b> posts
                </span>
                <span
                  onClick={handleFollowers}
                  className="text-base font-semibold text-gray-700 mr-2"
                >
                  <b>{user && user.followers.length}</b> followers
                </span>
                <span
                  onClick={() => setShowFollowingDiv((prev) => !prev)}
                  className="text-base font-semibold text-gray-700"
                >
                  <b>{user && user.following.length}</b> following
                </span>
              </div>

              <div className="text-left pl-4 pt-3">
                <span className="text-lg font-bold text-gray-700 mr-2">
                  {user && user.user.name}
                </span>
              </div>

              <div className="text-left pl-4 pt-3">
                <p className="text-base font-medium text-blue-700 mr-2">
                  #graphicsdesigner #traveller #reader #blogger #digitalmarketer
                </p>
                <p className="text-base font-medium text-gray-700 mr-2">
                  https://www.behance.net/hiravesona7855
                </p>

                <div className="mt-4">
                  {isFollowing ? (
                    <button
                      onClick={handleUnfollow}
                      className="ml-2 w-[120px] select-none rounded-lg bg-gray-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                      type="button"
                    >
                      Following
                    </button>
                  ) : (
                    <button
                      onClick={handleFollow}
                      className="w-[120px] select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                      type="button"
                    >
                      Follow
                    </button>
                  )}

                  <button
                    className="ml-2 w-[120px] select-none rounded-lg bg-gray-200 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-black shadow-md shadow-gray-500/20 transition-all hover:shadow-lg hover:shadow-gray-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                  >
                    Message
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
              <div className="relative shadow-xl mx-auto h-24 w-24 -my-12 border-white rounded-full overflow-hidden border-4">
                <img
                  className="object-cover w-full h-full"
                  src="https://images.unsplash.com/photo-1502164980785-f8aa41d53611?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80"
                />
              </div>
              <h1 className="pt-16 text-base font-semibold text-gray-900">
                Fun
              </h1>
            </div>

            <div className="flex-1 text-center px-4 py-2 m-2">
              <div className="relative shadow-xl mx-auto h-24 w-24 -my-12 border-white rounded-full overflow-hidden border-4">
                <img
                  className="object-cover w-full h-full"
                  src="https://images.unsplash.com/photo-1456415333674-42b11b9f5b7b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80"
                />
              </div>
              <h1 className="pt-16 text-base font-semibold text-gray-900">
                Travel
              </h1>
            </div>

            <div className="flex-1 text-center px-4 py-2 m-2">
              <div className="relative shadow-xl mx-auto h-24 w-24 -my-12 border-white rounded-full overflow-hidden border-4">
                <img
                  className="object-cover w-full h-full"
                  src="https://images.unsplash.com/photo-1494972308805-463bc619d34e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1052&q=80"
                />
              </div>
              <h1 className="pt-16 text-base font-semibold text-gray-900">
                Food
              </h1>
            </div>

            <div className="flex-1 text-center px-4 py-2 m-2">
              <div className="relative shadow-xl mx-auto h-24 w-24 -my-12 border-white rounded-full overflow-hidden border-4">
                <img
                  className="object-cover w-full h-full"
                  src="https://images.unsplash.com/photo-1516834474-48c0abc2a902?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1053&q=80"
                />
              </div>
              <h1 className="pt-16 text-base font-semibold text-gray-900">
                Sketch
              </h1>
            </div>

            <div className="flex-1 text-center px-4 py-2 m-2">
              <div className="relative shadow-xl mx-auto h-24 w-24 -my-12 border-white rounded-full overflow-hidden border-4">
                <img
                  className="object-cover w-full h-full"
                  src="https://images.unsplash.com/photo-1444021465936-c6ca81d39b84?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80"
                />
              </div>
              <h1 className="pt-16 text-base font-semibold text-gray-900">
                My Work
              </h1>
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
                    <path d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
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
                    <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
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
                <h3 className="text-sm font-medium text-gray-700 mr-2">
                  SAVED
                </h3>
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
                    <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </button>
              </div>
              <div className="flex inline-flex ml-2 mt-1">
                <h3 className="text-sm font-medium text-gray-700 mr-2">
                  TAGGED
                </h3>
              </div>
            </div>
          </div>

          <div>
            {posts.map(
              (post, index) =>
                index % 3 === 0 && (
                  <div key={index / 3} className="flex pt-4">
                    {posts.slice(index, index + 3).map((post, idx) => (
                      <div
                        key={index + idx}
                        className="flex-1 text-center relative px-4 py-2 m-2"
                        onClick={() => handlePostDetails(post)}
                      >
                        {post.images.length > 1 && (
                          <div className="absolute top-2 right-2 bg-white rounded-full w-6 h-6 flex items-center justify-center">
                            <span className="text-gray-500">
                              +{post.images.length - 1}
                            </span>
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfiles;
