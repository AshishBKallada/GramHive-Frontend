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
  const userId = useSelector((state) => state.user._id);

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
    } catch (error) {}
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
        const value = updatedPost.likes.find((post) => {
          console.log(post);
          return post.user._id === author ? post : undefined;
        });
        console.log(author, value);
        setPosts([]);
        updatedPosts[index] = updatedPost;
        setPosts(updatedPosts);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
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
      console.error(error);
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
                  src={post.userId?.image}
                  alt={post.userId?.username}
                />
                <div className="ml-3">
                  <span className="text-sm font-semibold antialiased block leading-tight">
                    {post.userId?.username}
                  </span>
                  <span className="text-gray-600 text-xs block">
                    Asheville, North Carolina
                  </span>
                </div>
              </div>
              <div className="relative h-56 sm:h-64 xl:h-80 2xl:h-96">
                <Carousel slideInterval={1500}>
                  {post.images.map((media, index) => (
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
                  ))}
                </Carousel>
                <div
                  className="absolute bottom-2 right-2 z-10 text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-black text-white rounded-full cursor-pointer"
                  onClick={toggleDrawer}
                >
                  <i className="fa fa-user mr-2"></i>
                  Tags <span className="ml-2">{post.tags.length}</span>
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
                    {post.tags.map((user, index) => (
                      <Link to={`/userprofile/${user._id}`} key={index}>
                        <div className="flex gap-4 bg-gray-300 rounded-xl border-b border-gray-300 mb-2 text-black pl-12 p-2 transition-transform hover:scale-105 hover:bg-teal-500 hover:text-white">
                          <img
                            className="w-10 h-10 rounded-full"
                            src={user.image}
                            alt=""
                          />
                          <span>{user.username}</span>
                        </div>
                      </Link>
                    ))}
                  </Typography>
                </Drawer>
              </div>

              <p className="ml-2 text-gray-600">{post.caption}</p>
              <div className="flex items-center justify-between mx-4 mt-3 mb-2">
                <div className="flex gap-5">
                  {post &&
                  post?.likes?.find((like) => {
                    return like.user._id.toString() === author.toString();
                  }) ? (
                    <button onClick={() => handleUnLike(post._id, i)}>
                      <svg
                        fill="#ff0000"
                        height="24"
                        viewBox="0 0 48 48"
                        width="24"
                      >
                        <path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3z" />
                      </svg>
                    </button>
                  ) : (
                    <button onClick={() => handleLike(post._id, i)}>
                      <svg
                        fill="#262626"
                        height="24"
                        viewBox="0 0 48 48"
                        width="24"
                      >
                        <path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
                      </svg>
                    </button>
                  )}

                  <svg
                    onClick={() => handlePostDetails(post)}
                    fill="#262626"
                    height="24"
                    viewBox="0 0 48 48"
                    width="24"
                  >
                    <path
                      clipRule="evenodd"
                      d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                  <svg
                    fill="#262626"
                    height="24"
                    viewBox="0 0 48 48"
                    width="24"
                  >
                    <path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path>
                  </svg>
                </div>
              </div>
              <div className="font-semibold text-sm mx-4 mt-2 mb-4">
                {post?.likes?.length > 0 ? post?.likes.length + " likes" : ""}
              </div>
            </div>
          </div>
        ))}
        {posts.length > 0 && posts.length % 2 === 0 && <ShowAds />}
      </InfiniteScroll>
    </div>
  );
}

export default PostCard;
