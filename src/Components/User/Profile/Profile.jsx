import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import MyComponent from "../Post/PostDetails";
import Followers from "../Follower/Follower";
import { useRef } from "react";
import LoadingSpinner from "../../External/LoadingSpinner";
import { useLoading } from "../../../Context/LoadingContext";
import { getProfile, getProfileSaved } from "../../../services/services";
import { ParallaxScroll } from "../../External/acertinity-grid";

function Profile() {
  const user = useSelector((state) => state.user);

  const followersRef = useRef(null);
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [postDetails, setpostDetails] = useState(false);
  const [post, setPost] = useState([]);

  const { isLoading, setLoading } = useLoading();

  const [showFollow, setShowFollow] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  const [isHovered, setIsHovered] = useState(false);
  const [activeTab, setActiveTab] = useState("POSTS");

  const [tabData, setTabData] = useState([]);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const userId = user.user._id;
        const response = await getProfile(userId);

        if (response.status === 200) {
          const data = response.data;
          setPosts(data.posts);
          setFollowers(data.followers);
          setFollowing(data.following);
          setLoading(false);
        } else {
          setLoading(false);
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

    const handleClickOutside = (event) => {
      if (
        followersRef.current &&
        !followersRef.current.contains(event.target)
      ) {
        setShowFollow(false);
        setShowFollowing(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [user, navigate]);

  const handlePostDetails = (post) => {
    setpostDetails((prev) => !prev);
    setPost(post);
  };

  const handleActiveTab = async (tab) => {
    if (tab === "SAVED") {
      try {
        const userId = user.user._id;
        const response = await getProfileSaved(userId);
        const savedPosts = response.data.posts;
        setTabData(savedPosts);
      } catch (error) {
        console.error("Error fetching saved posts:", error);
      }
    }
    setActiveTab(tab);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      {isHovered && (
        <div className="absolute flex justify-center items-center z-50 bg-black bg-opacity-75 rounded-full shadow-lg transition-transform duration-500 ease-in-out transform scale-75 translate-y-10 hover:scale-100 hover:translate-y-0">
          <img
            onMouseLeave={() => setIsHovered(false)}
            src={user.user.image}
            alt="Profile"
            className="rounded-full shadow-lg"
            style={{ width: "500px", height: "500px" }}
          />
        </div>
      )}

      <div>
        {postDetails && (
          <MyComponent
            user={user}
            post={post}
            setpostDetails={setpostDetails}
            posts={posts}
            setPosts={setPosts}
          />
        )}
        <div ref={followersRef}>
          {showFollow && followers.length > 0 && (
            <Followers
              showRemove={true}
              type={"Followers"}
              users={followers}
              setFollowers={setFollowers}
              following={following}
              setFollowing={setFollowing}
            />
          )}
          {showFollowing && following.length > 0 && (
            <Followers type={"Following"} users={following} />
          )}
        </div>
        <ToastContainer />

        <div className="insta-clone">
          <div className="bg-gray-100 h-auto px-48">
            <div className="flex md:flex-row-reverse flex-wrap">
              <div className="w-full md:w-3/4 p-4 text-center">
                <div className="text-left pl-4 pt-3">
                  <span className="text-base text-gray-700 text-2xl mr-2">
                    {user.user.username}
                  </span>
                  <span className="text-base font-semibold text-gray-700 mr-2">
                    <button
                      onClick={() => navigate("/editprofile")}
                      className="ml-12 bg-blue-600 text-white  hover:bg-blue-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-600 hover:border-transparent rounded"
                    >
                      Edit Profile
                    </button>
                  </span>

                  <span className="text-base font-semibold text-gray-700">
                    <button
                      className="p-1 border-transparent text-gray-700 rounded-full hover:text-blue-600 focus:outline-none focus:text-gray-600"
                      aria-label="Notifications"
                    >
                      <svg
                        className="h-8 w-8"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </button>
                  </span>
                </div>

                <div className="text-left pl-4 pt-3">
                  <span className="text-base font-semibold text-gray-700 mr-2">
                    <b>{posts.length}</b> posts
                  </span>
                  <span
                    onClick={() => setShowFollow(true)}
                    className="text-base font-semibold text-gray-700 mr-2"
                  >
                    <b>{followers.length}</b> followers
                  </span>
                  <span
                    onClick={() => setShowFollowing(true)}
                    className="text-base font-semibold text-gray-700"
                  >
                    <b>{following.length}</b> following
                  </span>
                </div>

                <div className="flex flex-col text-left pl-4 pt-3">
                  <span className="text-lg font-bold text-gray-700 mr-2">
                    {user.user.name}
                  </span>
                </div>

                <div className="text-left pl-4 pt-3">
                  <p className="text-base font-medium text-blue-700 mr-2">
                    <span className="text-gray-700">Email : </span>
                    {user.user.email}
                  </p>
                  <p className="text-base font-medium text-blue-700 mr-2">
                    <span className="text-gray-700">Website : </span>
                    {user.user.website}
                  </p>
                  <p className="text-base font-medium text-gray-700 mr-2">
                    {user.user.bio}
                  </p>
                </div>
              </div>

              <div className="w-full md:w-1/4 p-4 text-center">
                <div className=" relative text-center mt-8 h-58 w-58">
                  <button
                    onMouseOver={() => setIsHovered((prev) => !prev)}
                    className="flex rounded-full"
                    id="user-menu"
                    aria-label="User menu"
                    aria-haspopup="true"
                  >
                    <img
                      className="h-58 w-58 rounded-full border-2 shadow-gray-500 shadow-xl"
                      src={
                        user.user.image
                          ? user.user.image.toString()
                          : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5OqxMapgWmHOW5iRqRICrYi0ozrogweWlzvoLPEuHnQ&s"
                      }
                      alt=""
                    />
                  </button>
                </div>
              </div>
            </div>

            <hr className="border-gray-500 mt-6" />
            <hr className="border-gray-500 w-20 border-t-1 ml-64 border-gray-800" />

            <div className="flex flex-row mt-4 justify-center mr-16">
              <div
                onClick={() => handleActiveTab("POSTS")}
                className={`flex text-gray-700 text-center py-2 m-2 pr-5 ${
                  activeTab === "POSTS" ? "text-blue-500" : ""
                }`}
              >
                <div className="flex inline-flex">
                  <button
                    className="border-transparent text-gray-800 rounded-full hover:text-blue-600 focus:outline-none focus:text-gray-600"
                    aria-label="Notifications"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
                <div className="flex inline-flex ml-2 mt-1">
                  <h3
                    className={`text-sm font-bold ${
                      activeTab === "POSTS" ? "text-blue-500" : "text-gray-800"
                    } mr-2`}
                  >
                    POSTS
                  </h3>
                </div>
              </div>

              <div
                onClick={() => handleActiveTab("SAVED")}
                className={`flex text-gray-700 text-center py-2 m-2 pr-5 ${
                  activeTab === "SAVED" ? "text-blue-500" : ""
                }`}
              >
                <div className="flex inline-flex">
                  <button
                    className="border-transparent text-gray-600 rounded-full hover:text-blue-600 focus:outline-none focus:text-gray-600"
                    aria-label="Notifications"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                  </button>
                </div>
                <div className="flex inline-flex ml-2 mt-1">
                  <h3
                    className={`text-sm font-medium ${
                      activeTab === "SAVED" ? "text-blue-500" : "text-gray-700"
                    } mr-2`}
                  >
                    SAVED
                  </h3>
                </div>
              </div>

              <div
                onClick={() => handleActiveTab("TAGGED")}
                className={`flex text-gray-700 text-center py-2 m-2 pr-5 ${
                  activeTab === "TAGGED" ? "text-blue-500" : ""
                }`}
              >
                <div className="flex inline-flex">
                  <button
                    className="border-transparent text-gray-600 rounded-full hover:text-blue-600 focus:outline-none focus:text-gray-600"
                    aria-label="Notifications"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                  </button>
                </div>
                <div className="flex inline-flex ml-2 mt-1">
                  <h3
                    className={`text-sm font-medium ${
                      activeTab === "TAGGED" ? "text-blue-500" : "text-gray-700"
                    } mr-2`}
                  >
                    TAGGED
                  </h3>
                </div>
              </div>
            </div>

            <div>
              {activeTab === "POSTS" && (
                <ParallaxScroll
                  images={posts}
                  handlePostDetails={handlePostDetails}
                />
              )}

              {activeTab === "SAVED" && (
                <ParallaxScroll
                  images={tabData}
                  handlePostDetails={handlePostDetails}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
