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

          <div>
            <div class="max-w-3xl w-full mx-auto z-10">
              <div class="flex flex-col">
                <div class="bg-teal-800 border border-gray-900 shadow-lg  rounded-3xl p-4 m-4">
                  <div class="flex-none sm:flex">
                    <div class=" relative h-32 w-32   sm:mb-0 mb-3">
                      <img
                        src="https://tailwindcomponents.com/storage/avatars/njkIbPhyZCftc4g9XbMWwVsa7aGVPajYLRXhEeoo.jpg"
                        alt="aji"
                        class=" w-32 h-32 object-cover rounded-2xl"
                      />
                      <a
                        href="#"
                        class="absolute -right-2 bottom-2   -ml-3  text-white p-1 text-xs bg-green-400 hover:bg-green-500 font-medium tracking-wider rounded-full transition ease-in duration-300"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          class="h-4 w-4"
                        >
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                        </svg>
                      </a>
                    </div>
                    <div class="flex-auto sm:ml-5 justify-evenly">
                      <div class="flex items-center justify-between sm:mt-2">
                        <div class="flex items-center">
                          <div class="flex flex-col">
                            <div class="w-full flex-none text-lg text-gray-200 font-bold leading-none">
                              {" "}
                              {user && user.user.username}
                            </div>
                            <div class="flex-auto text-gray-400 my-1">
                              <span class="mr-3 ">
                                {" "}
                                {user && user.user.name}
                              </span>
                              <span class="mr-3 border-r border-gray-600  max-h-0"></span>
                              <span>Cochin, IND</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="flex flex-row items-center">
                        <div class="flex-1 inline-flex  hidden items-center">
                          <img
                            class="w-5 h-5"
                            src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDY0IDY0IiBoZWlnaHQ9IjY0cHgiIGlkPSJMYXllcl8xIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCA2NCA2NCIgd2lkdGg9IjY0cHgiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxwYXRoIGQ9Ik0zMiw3LjE3NEMxOC4zMTEsNy4xNzQsNy4xNzQsMTguMzExLDcuMTc0LDMyYzAsMTMuNjg5LDExLjEzNywyNC44MjYsMjQuODI2LDI0LjgyNmMxMy42ODksMCwyNC44MjYtMTEuMTM3LDI0LjgyNi0yNC44MjYgIEM1Ni44MjYsMTguMzExLDQ1LjY4OSw3LjE3NCwzMiw3LjE3NHogTTM4LjE3NCwzMi44NzRoLTQuMDM5YzAsNi40NTMsMCwxNC4zOTgsMCwxNC4zOThoLTUuOTg1YzAsMCwwLTcuODY4LDAtMTQuMzk4aC0yLjg0NXYtNS4wODggIGgyLjg0NXYtMy4yOTFjMC0yLjM1NywxLjEyLTYuMDQsNi4wNC02LjA0bDQuNDMzLDAuMDE3djQuOTM5YzAsMC0yLjY5NSwwLTMuMjE5LDBjLTAuNTI0LDAtMS4yNjgsMC4yNjItMS4yNjgsMS4zODZ2Mi45OWg0LjU2ICBMMzguMTc0LDMyLjg3NHoiLz48L3N2Zz4="
                          />
                          <img
                            class="w-5 h-5"
                            src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDU2LjY5MyA1Ni42OTMiIGhlaWdodD0iNTYuNjkzcHgiIGlkPSJMYXllcl8xIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCA1Ni42OTMgNTYuNjkzIiB3aWR0aD0iNTYuNjkzcHgiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxwYXRoIGQ9Ik0yOC4zNDgsNS4xNTdjLTEzLjYsMC0yNC42MjUsMTEuMDI3LTI0LjYyNSwyNC42MjVjMCwxMy42LDExLjAyNSwyNC42MjMsMjQuNjI1LDI0LjYyM2MxMy42LDAsMjQuNjIzLTExLjAyMywyNC42MjMtMjQuNjIzICBDNTIuOTcxLDE2LjE4NCw0MS45NDcsNS4xNTcsMjguMzQ4LDUuMTU3eiBNNDAuNzUyLDI0LjgxN2MwLjAxMywwLjI2NiwwLjAxOCwwLjUzMywwLjAxOCwwLjgwM2MwLDguMjAxLTYuMjQyLDE3LjY1Ni0xNy42NTYsMTcuNjU2ICBjLTMuNTA0LDAtNi43NjctMS4wMjctOS41MTMtMi43ODdjMC40ODYsMC4wNTcsMC45NzksMC4wODYsMS40OCwwLjA4NmMyLjkwOCwwLDUuNTg0LTAuOTkyLDcuNzA3LTIuNjU2ICBjLTIuNzE1LTAuMDUxLTUuMDA2LTEuODQ2LTUuNzk2LTQuMzExYzAuMzc4LDAuMDc0LDAuNzY3LDAuMTExLDEuMTY3LDAuMTExYzAuNTY2LDAsMS4xMTQtMC4wNzQsMS42MzUtMC4yMTcgIGMtMi44NC0wLjU3LTQuOTc5LTMuMDgtNC45NzktNi4wODRjMC0wLjAyNywwLTAuMDUzLDAuMDAxLTAuMDhjMC44MzYsMC40NjUsMS43OTMsMC43NDQsMi44MTEsMC43NzcgIGMtMS42NjYtMS4xMTUtMi43NjEtMy4wMTItMi43NjEtNS4xNjZjMC0xLjEzNywwLjMwNi0yLjIwNCwwLjg0LTMuMTJjMy4wNjEsMy43NTQsNy42MzQsNi4yMjUsMTIuNzkyLDYuNDgzICBjLTAuMTA2LTAuNDUzLTAuMTYxLTAuOTI4LTAuMTYxLTEuNDE0YzAtMy40MjYsMi43NzgtNi4yMDUsNi4yMDYtNi4yMDVjMS43ODUsMCwzLjM5NywwLjc1NCw0LjUyOSwxLjk1OSAgYzEuNDE0LTAuMjc3LDIuNzQyLTAuNzk1LDMuOTQxLTEuNTA2Yy0wLjQ2NSwxLjQ1LTEuNDQ4LDIuNjY2LTIuNzMsMy40MzNjMS4yNTctMC4xNSwyLjQ1My0wLjQ4NCwzLjU2NS0wLjk3NyAgQzQzLjAxOCwyMi44NDksNDEuOTY1LDIzLjk0Miw0MC43NTIsMjQuODE3eiIvPjwvc3ZnPg=="
                          />
                          <img
                            class="w-5 h-5"
                            src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGhlaWdodD0iNjdweCIgaWQ9IkxheWVyXzEiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDY3IDY3OyIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgNjcgNjciIHdpZHRoPSI2N3B4IiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48cGF0aCBkPSJNNTAuODM3LDQ4LjEzN1YzNi40MjVjMC02LjI3NS0zLjM1LTkuMTk1LTcuODE2LTkuMTk1ICBjLTMuNjA0LDAtNS4yMTksMS45ODMtNi4xMTksMy4zNzRWMjcuNzFoLTYuNzljMC4wOSwxLjkxNywwLDIwLjQyNywwLDIwLjQyN2g2Ljc5VjM2LjcyOWMwLTAuNjA5LDAuMDQ0LTEuMjE5LDAuMjI0LTEuNjU1ICBjMC40OS0xLjIyLDEuNjA3LTIuNDgzLDMuNDgyLTIuNDgzYzIuNDU4LDAsMy40NCwxLjg3MywzLjQ0LDQuNjE4djEwLjkyOUg1MC44Mzd6IE0yMi45NTksMjQuOTIyYzIuMzY3LDAsMy44NDItMS41NywzLjg0Mi0zLjUzMSAgYy0wLjA0NC0yLjAwMy0xLjQ3NS0zLjUyOC0zLjc5Ny0zLjUyOHMtMy44NDEsMS41MjQtMy44NDEsMy41MjhjMCwxLjk2MSwxLjQ3NCwzLjUzMSwzLjc1MywzLjUzMUgyMi45NTl6IE0zNCw2NCAgQzE3LjQzMiw2NCw0LDUwLjU2OCw0LDM0QzQsMTcuNDMxLDE3LjQzMiw0LDM0LDRzMzAsMTMuNDMxLDMwLDMwQzY0LDUwLjU2OCw1MC41NjgsNjQsMzQsNjR6IE0yNi4zNTQsNDguMTM3VjI3LjcxaC02Ljc4OXYyMC40MjcgIEgyNi4zNTR6IiBzdHlsZT0iZmlsbC1ydWxlOmV2ZW5vZGQ7Y2xpcC1ydWxlOmV2ZW5vZGQ7ZmlsbDojMDEwMTAxOyIvPjwvc3ZnPg=="
                          />
                        </div>
                      </div>
                      <div class="flex pt-2  text-sm text-gray-400">
                        <div class="flex-1 inline-flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5 mr-2"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path>
                          </svg>
                          <p class="">
                            {user && user.followers.length} Followers
                          </p>
                        </div>
                        <div class="flex-1 inline-flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5 mr-2"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path>
                          </svg>
                          <p class="">
                            {user && user.following.length} Following
                          </p>
                        </div>
                        <div class="flex-1 inline-flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5 mr-2"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                          <p class="">14 posts</p>
                        </div>
                        <button class="flex-no-shrink bg-green-400 hover:bg-green-500 px-5 ml-4 py-2 text-xs shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-green-300 hover:border-green-500 text-white rounded-full transition ease-in duration-300">
                          FOLLOW
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
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
