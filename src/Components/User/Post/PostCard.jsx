import { Carousel } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePostDetail from "./HomePostDetail";
import InfiniteScroll from "react-infinite-scroll-component";
import { likePost, removePostLike } from "../../../services/services";
import ShowAds from "../Promotions/ShowAds";
import { Drawer, Typography, IconButton } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { PostSkeleton } from "../../Skeltons/PostSkelton";
import { io } from "socket.io-client";
import { isVideo } from "../../../Functions/isVideo";

function PostCard() {
  const author = useSelector((state) => state.user.user._id);
  const [currPost, setCurrPost] = useState(null);
  const userId = useSelector((state) => state.user.user._id);

  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const [openDrawer, setOpenDrawer] = useState(false);
  const [loading, setLoading] = useState(false);
  const socket = io("https://bassheads.shop");

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const fetchPosts = async () => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const response = await fetch(
        `https://bassheads.shop/posts/home/${userId}?page=${page}`
      );
      if (response.ok) {
        const data = await response.json();
        console.log("HOME POSTS", data);
        setLoading(false);

        if (data.posts.length === 0) {
          setHasMore(false);
          return;
        }
        setPosts((prevPosts) => [...prevPosts, ...data.posts]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleLike = async (postId, index) => {
    try {
      const response = await likePost(postId, author);
      if (response.status === 200) {
        const notification = response?.data?.notification;
        if (notification && notification.userId !== author) {
          socket.emit("sentNotification", notification);
        }

        const newLikes = response.data.likes;
        const postIndex = posts.findIndex((post) => post._id === postId);

        if (postIndex !== -1) {
          setPosts((prevPosts) => {
            const updatedPosts = [...prevPosts];
            updatedPosts[postIndex] = {
              ...updatedPosts[postIndex],
              likes: newLikes,
            };
            return updatedPosts;
          });
        }
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const handleUnLike = async (postId, index) => {
    try {
      const response = await removePostLike(postId, author);
      if (response.status === 200) {
        const updatedPost = response.data.post;
        const updatedPosts = [...posts];
        const postIndex = updatedPosts.findIndex((post) => post._id === postId);
        if (postIndex !== -1) {
          updatedPosts[postIndex] = updatedPost;
          setPosts(updatedPosts);
        }
      }
    } catch (error) {
      console.error("Error toggling unlike:", error);
    }
  };

  const handleSave = async (postId) => {
    try {
      const response = await fetch(
        `https://bassheads.shop/posts/${postId}/save/${author}`,
        { method: "POST" }
      );
      if (response.ok) {
        toast.success("Post Saved", { autoClose: 1000 });
      }
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  const handlePostDetails = (post) => {
    setCurrPost(post);
  };

  return (
    <div>
      <ToastContainer />
      {currPost && (
        <HomePostDetail
          post={currPost}
          setCurrPost={setCurrPost}
          setPosts={setPosts}
          posts={posts}
        />
      )}

      <InfiniteScroll
        dataLength={posts.length}
        next={fetchPosts}
        hasMore={hasMore}
        loader={
          <div>
            {[...Array(5)].map((_, index) => (
              <PostSkeleton key={index} />
            ))}
          </div>
        }
        endMessage={
          posts.length < 0 ? (
            <p>No posts to show !</p>
          ) : (
            <p>You have covered all posts..</p>
          )
        }
      >
        {posts.map((post, i) => (
          <div key={post._id} className="mt-5 p-4">
            <div className="bg-white border-t-2 border-gray-200 shadow-2xl rounded-lg max-w-xl">
              <div className="flex items-center px-4 py-3">
                <img
                  className="h-8 w-8 rounded-full"
                  src={post.userId?.image || 'default-image-url'}
                  alt={post.userId?.username || 'Default Username'}
                />
                <div className="ml-3">
                  <span className="text-sm font-semibold antialiased block leading-tight">
                    {post.userId?.username || 'Default Username'}
                  </span>
                  <span className="text-gray-600 text-xs block">
                    Asheville, North Carolina
                  </span>
                </div>
              </div>
              <div className="relative h-56 sm:h-64 xl:h-80 2xl:h-96">
                <Carousel slideInterval={1500}>
                  {post.images && post.images.length > 0 ? (
                    post.images.map((media, index) => (
                      <div key={index} className="h-full w-full">
                        {isVideo(media) ? (
                          <video
                            onClick={() => handlePostDetails(post)}
                            src={media}
                            controls
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <img
                            onClick={() => handlePostDetails(post)}
                            src={media}
                            alt={`Media ${index}`}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                    ))
                  ) : (
                    <p>No media available</p>
                  )}
                </Carousel>
                <div
                  className="absolute bottom-2 right-2 z-10 text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-black text-white rounded-full cursor-pointer"
                  onClick={toggleDrawer}
                >
                  <i className="fa fa-user mr-2"></i>
                  Tags <span className="ml-2">{post.tags?.length || 0}</span>
                </div>
                <Drawer
                  open={openDrawer}
                  onClose={toggleDrawer}
                  className="absolute top-0 right-0 w-full max-w-md p-4 bg-transparent border-0"
                  overlayClassName="absolute top-0 right-0 h-full w-full"
                  zIndex={999}
                >
                  <div className="mb-6 flex items-center justify-between">
                    <Typography variant="h6" className="text-gray-600">
                      Tagged Users
                    </Typography>
                    <IconButton
                      variant="text"
                      color="white"
                      onClick={toggleDrawer}
                    ></IconButton>
                  </div>
                  <Typography color="gray" className="mb-8 pr-4 font-normal">
                    {post.tags && post.tags.length > 0 ? (
                      post.tags.map((user, index) => (
                        <Link to={`/userprofile/${user._id}`} key={index}>
                          <div className="flex gap-4 bg-gray-300 rounded-xl border-b border-gray-300 mb-2 text-black pl-12 p-2 transition-transform hover:scale-105 hover:bg-teal-500 hover:text-white">
                            <img
                              className="w-10 h-10 rounded-full"
                              src={user.image || 'default-image-url'}
                              alt={user.username || 'Default Username'}
                            />
                            <span>{user.username || 'Default Username'}</span>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <p>No tags available</p>
                    )}
                  </Typography>
                </Drawer>
              </div>

              <p className="ml-2 text-gray-600">{post.caption || 'No caption available'}</p>
              <div className="flex items-center justify-between mx-4 mt-3 mb-2">
                <div className="flex gap-5">
                  {post &&
                  post?.likes?.find((like) => {
                    return like.user._id.toString() === author.toString();
                  }) ? (
                    <button onClick={() => handleUnLike(post._id, i)}>
                      <svg
                        fill="#ff0000"
                        height="24px"
                        width="24px"
                        version="1.1"
                        id="Layer_1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 64 64"
                        xmlSpace="preserve"
                        stroke="#000000"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          <path d="M42.5,3.8c-7.4,0-13.7,5.6-15.4,12.9c-1.7-7.3-8-12.9-15.4-12.9c-8.4,0-15.2,6.8-15.2,15.2 c0,5.1,2.6,9.5,6.4,12.5L32.1,43c0,1.3,0.8,2.4,2,2.8l7.3,2.2c1.2,0.4,2.5-0.1,3.2-1.2l11.7-16.2 c3.6-5.1,6.4-11.4,6.4-18.3C57.6,10.6,51.8,3.8,42.5,3.8z"></path>
                        </g>
                      </svg>
                    </button>
                  ) : (
                    <button onClick={() => handleLike(post._id, i)}>
                      <svg
                        fill="#000000"
                        height="24px"
                        width="24px"
                        version="1.1"
                        id="Layer_1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 64 64"
                        xmlSpace="preserve"
                        stroke="#000000"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          <path d="M42.5,3.8c-7.4,0-13.7,5.6-15.4,12.9c-1.7-7.3-8-12.9-15.4-12.9c-8.4,0-15.2,6.8-15.2,15.2 c0,5.1,2.6,9.5,6.4,12.5L32.1,43c0,1.3,0.8,2.4,2,2.8l7.3,2.2c1.2,0.4,2.5-0.1,3.2-1.2l11.7-16.2 c3.6-5.1,6.4-11.4,6.4-18.3C57.6,10.6,51.8,3.8,42.5,3.8z"></path>
                        </g>
                      </svg>
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  <button onClick={() => handleSave(post._id)}>
                    <svg
                      fill="#000000"
                      height="24px"
                      width="24px"
                      version="1.1"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 64 64"
                      xmlSpace="preserve"
                      stroke="#000000"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path d="M52,6H12c-5.5,0-10,4.5-10,10v36c0,5.5,4.5,10,10,10h40c5.5,0,10-4.5,10-10V16C62,10.5,57.5,6,52,6z M51,48H13 c-0.5,0-1-0.5-1-1v-3c0-0.5,0.5-1,1-1h38c0.5,0,1,0.5,1,1v3C52,47.5,51.5,48,51,48z M51,42H13c-0.5,0-1-0.5-1-1v-3c0-0.5,0.5-1,1-1h38 c0.5,0,1,0.5,1,1v3C52,41.5,51.5,42,51,42z M51,36H13c-0.5,0-1-0.5-1-1v-3c0-0.5,0.5-1,1-1h38c0.5,0,1,0.5,1,1v3C52,35.5,51.5,36,51,36z M51,30H13 c-0.5,0-1-0.5-1-1v-3c0-0.5,0.5-1,1-1h38c0.5,0,1,0.5,1,1v3C52,29.5,51.5,30,51,30z M51,24H13c-0.5,0-1-0.5-1-1v-3c0-0.5,0.5-1,1-1h38c0.5,0,1,0.5,1,1v3 C52,23.5,51.5,24,51,24z M51,18H13c-0.5,0-1-0.5-1-1v-3c0-0.5,0.5-1,1-1h38c0.5,0,1,0.5,1,1v3C52,17.5,51.5,18,51,18z"></path>
                      </g>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </InfiniteScroll>
      <ShowAds />
    </div>
  );
}

export default PostCard;
