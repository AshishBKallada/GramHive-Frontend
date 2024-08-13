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
      {/* Rest of the code */}
    </div>
  </div>
))}

        {posts.length > 0 && posts.length % 2 === 0 && <ShowAds />}
      </InfiniteScroll>
    </div>
  );
}

export default PostCard;
