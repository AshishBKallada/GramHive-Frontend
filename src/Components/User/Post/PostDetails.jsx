import React, { useEffect, useState } from "react";
import { Carousel } from "flowbite-react";
import axios from "axios";
import { useSelector } from "react-redux";
import { formatDistanceToNow } from "date-fns";
import { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import LikedList from "../LikedList/LikedList";
import PostEditor from "./postEditor";
import { useToast } from "@chakra-ui/react";
import { commentDelete, deleteCommentReply } from "../../../services/services";

function PostDetail({ user, post, setpostDetails, posts, setPosts }) {
  const author = useSelector((state) => state.user.user._id);
  const toast = useToast();

  const [isHidden, setIsHidden] = useState(true);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [liked, setLiked] = useState(null);
  const [replyingTo, setReplyingTo] = useState(null);
  const [reply, setReply] = useState("");

  const replyTextareaRef = useRef(null);
  const navigate = useNavigate();
  const postId = post._id;

  const [isSaved, setisSaved] = useState(post.isSaved);
  console.log("isSaved", isSaved);
  const [showLike, setShowLike] = useState(false);
  const [reportModal, setReportModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePostDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/posts/${postId}/delete`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        console.log("Post was deleted successfully");
        const updatedPosts = posts.filter((p) => p._id !== postId);

        toast.success("Post was Deleted", {
          autoClose: 1000,
          onClose: closeModal,
        });
        setPosts(updatedPosts);
      }
    } catch (error) {
      console.log("Error removing post", error);
    }
  };

  const handleComment = async (e) => {
    if (comment.trim() === "") {
      toast({
        title: "Comment cannot be empty",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3000/comment/${postId}/addcomments`, {
        comment,
        author,
      });
      const response = await axios.get(
        `http://localhost:3000/comment/${postId}/comments`
      );
      if (response.status === 200) {
        setComments(response.data.comments);
        setComment("");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/comment/${postId}/comments`
        );
        if (response.status === 200) {
          console.log("set set ", response.data.comments);
          setComments(response.data.comments);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchComments();

    const fetchLikes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/posts/${postId}/likes`
        );
        if (response.status === 200) {
          console.log("LIKES FIRST CALL", response.data.likes);
          console.log("author:", author);
          setLikes(response.data.likes);
          if (
            response.data.likes.length > 0 &&
            response.data.likes.some((like) => like.user._id === author)
          ) {
            console.log("TRUE ,,, USER HAS LIKED");
            setLiked(true);
            console.log(liked);
          } else {
            console.log("FALSE ,,, USER NOT LIKED");
            setLiked(false);
          }
        }
      } catch (error) {
        console.error("Error fetching likes:", error);
      }
    };
    fetchLikes();
  }, [postId]);

  const closeModal = () => {
    setIsHidden(false);
    setpostDetails((prev) => !prev);
  };

  const handleLike = async () => {
    try {
      if (!liked) {
        console.log("postId", postId, author);
        await axios.post(`http://localhost:3000/posts/${postId}/like`, {
          author,
        });
        setLikes((prevLikes) => prevLikes + 1);
        setLiked(true);

      } else {
        await axios.delete(`http://localhost:3000/posts/${postId}/unlike`, {
          author,
        });
        setLikes((prevLikes) => prevLikes - 1);
        setLiked(false);

      }
      setLiked(!liked);
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const handleReplyClick = (commentId) => {
    setReplyingTo(commentId);
  };

  const handleReply = async () => {
    console.log("Replying to comment:", replyingTo, "Reply:", reply);
    if (reply.trim() === "") {
      toast({
        title: "Comment cannot be empty",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:3000/comment/${postId}/replies/${replyingTo}`,
        {
          reply,
          author,
        }
      );
      if (response.status === 200) {
        const newReplyId = Math.random().toString(36).substring(7);

        const newReply = {
          _id: newReplyId,
          reply,
          author: { _id: author, image: user.image, username: user.username },
          createdAt: new Date().toISOString(),
        };

        const updatedComments = comments.map((comment) => {
          if (comment._id === replyingTo) {
            return {
              ...comment,
              replies: [...comment.replies, newReply],
            };
          }
          return comment;
        });

        setComments(updatedComments);

        setReply("");
        setReplyingTo(null);
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (replyingTo && replyTextareaRef.current) {
      replyTextareaRef.current.focus();
    }
  }, [replyingTo]);

  const handleSave = async (e) => {
    try {
      console.log(postId, author);
      const response = await fetch(
        `http://localhost:3000/posts/${postId}/save/${author}`,
        { method: "POST" }
      );
      if (response.ok) {
        console.log("Post Saved Successfully");
        toast({
          title: "post saved !",
          status: "success",
          duration: 1500,
          isClosable: true,
        });
        setisSaved(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUnSave = async (e) => {
    try {
      console.log(postId, author);
      const response = await fetch(
        `http://localhost:3000/posts/${postId}/unsave/${author}`,
        { method: "POST" }
      );
      if (response.ok) {
        console.log("Post UnSaved Successfully");
        toast({
          title: "post unsaved !",
          status: "error",
          duration: 1500,
          isClosable: true,
        });
        setisSaved(false);
      }
    } catch (error) {
      console.error(error);
    }
  };
  console.log("showlike", showLike);

  const handleReportClick = () => {
    handleClose();
    setReportModal(true);
  };
  const handleReport = async () => {
    try {
      const userId = user.user._id;
      const response = await axios.post(
        `http://localhost:3000/posts/report/${postId}`,
        {
          author: author,
          userId: userId,
        }
      );

      if (response.status === 200) {
        console.log("POST Reported");
        toast.success("Post was successfully reported", { autoClose: 1500 });
        setReportModal(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditClick = () => {
    setEditModal(true);
    handleClose();
  };

  const handleCommentDelete = async (commentId) => {
    const response = await commentDelete(postId, commentId);
    console.log(response);
    if (response.status === 200) {
      toast({
        title: "Comment deleted",
        status: "success",
        duration: 1500,
        isClosable: true,
      });
      setComments(comments.filter((comment) => comment._id !== commentId));
    } else {
      toast({
        title: "Failed to delete comment",
        status: "error",
        duration: 1500,
        isClosable: true,
      });
    }
  };

  const handleDeleteReply = async (postId, commentId, replyId) => {
    const response = await deleteCommentReply(postId, commentId, replyId);
    if (response.status === 200) {
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment._id === commentId
            ? {
                ...comment,
                replies: comment.replies.filter(
                  (reply) => reply._id !== replyId
                ),
              }
            : comment
        )
      );
      toast({
        title: "Comment deleted",
        status: "success",
        duration: 1500,
        isClosable: true,
      });
    } else {
      toast({
        title: "Failed to delete comment",
        status: "error",
        duration: 1500,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <ToastContainer />
      {isHidden && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white w-full md:w-3/4 lg:w-2/3 xl:w-3/4 rounded-lg p-4 flex flex-col relative">
            {/* Close Button Icon */}
            <button className="absolute top-0 right-0 p-2" onClick={closeModal}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-500 hover:text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Main Content */}
            <div className="grid grid-cols-12 gap-4 h-full">
              {/* Left Column */}
              <div className="col-span-12 md:col-span-6 xl:col-span-6">
                {/* Your Left Column Content */}
                <div class="flex items-center px-4 py-3">
                  <img class="h-8 w-8 rounded-full" src={user.user.image} />
                  <div class="ml-3 flex-grow">
                    <span class="text-sm font-semibold antialiased block leading-tight">
                      {user.user.username}
                    </span>
                    <span class="text-gray-600 text-xs block">
                      Asheville, North Carolina
                    </span>
                  </div>
                 
                  <Menu>
                    <MenuHandler>
                      <Button className="bg-white">
                        <div>
                          <p class="text-lg font-lg text-black dark:text-white">
                            ...
                          </p>
                        </div>
                      </Button>
                    </MenuHandler>
                    <MenuList>
                      <MenuItem onClick={handleEditClick}>Edit</MenuItem>
                      <MenuItem onClick={handlePostDelete}>Delete </MenuItem>
                      <MenuItem onClick={handleReportClick}>Report</MenuItem>
                    </MenuList>
                  </Menu>
                </div>

                {editModal && (
                  <div class="fixed inset-0 flex items-center justify-center z-50 backdrop-blur confirm-dialog ">
                    <PostEditor post={post} setEditModal={setEditModal} />
                  </div>
                )}

                {reportModal && (
                  <div class="fixed inset-0 flex items-center justify-center z-50 backdrop-blur confirm-dialog ">
                    <div class="relative px-4 min-h-screen md:flex md:items-center md:justify-center">
                      <div class=" opacity-25 w-full h-full absolute z-10 inset-0"></div>
                      <div class="bg-white rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative shadow-lg">
                        <div class="md:flex items-center">
                          <div class="rounded-full border border-gray-300 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto">
                            <i class="bx bx-error text-3xl">&#9888;</i>
                          </div>
                          <div class="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
                            <p class="font-bold">Report Post ?</p>
                            <p class="text-sm text-gray-700 mt-1">
                              Are you sure you want to report this post?
                              Reporting helps us maintain a safe and respectful
                              community. If you believe this post violates our
                              community guidelines, please proceed with
                              reporting.
                            </p>
                          </div>
                        </div>
                        <div class="text-center md:text-right mt-4 md:flex md:justify-end">
                          <button
                            onClick={handleReport}
                            id="confirm-delete-btn"
                            class="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-red-200 text-red-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2"
                          >
                            Report
                          </button>
                          <button
                            onClick={() => setReportModal(false)}
                            id="confirm-cancel-btn"
                            class="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm mt-4 md:mt-0 md:order-1"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {showLike && (
                  <LikedList likes={likes} closemodal={setShowLike} />
                )}

                <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
                  <Carousel slideInterval={1500}>
                    {post &&
                      post.images.map((image, index) => (
                        <img key={index} src={image} alt={`Image ${index}`} />
                      ))}
                  </Carousel>
                </div>
                <p>{post && post.caption}</p>
                <div class="flex items-center justify-between mx-4 mt-3 mb-2">
                  <div class="flex gap-5">
                    <button onClick={handleLike}>
                      {liked ? (
                        <svg
                          fill="#ff0000"
                          height="24"
                          viewBox="0 0 48 48"
                          width="24"
                        >
                          <path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3z" />
                        </svg>
                      ) : (
                        <svg
                          fill="#262626"
                          height="24"
                          viewBox="0 0 48 48"
                          width="24"
                        >
                          <path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
                        </svg>
                      )}
                    </button>
                    <svg
                      fill="#262626"
                      height="24"
                      viewBox="0 0 48 48"
                      width="24"
                    >
                      <path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path>
                    </svg>
                  </div>
                  <div class="flex">
                    {isSaved ? (
                      <button onClick={handleUnSave}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="currentColor"
                          class="bi bi-bookmark-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2" />
                        </svg>
                      </button>
                    ) : (
                      <button onClick={handleSave}>
                        <svg
                          fill="#262626"
                          height="24"
                          viewBox="0 0 48 48"
                          width="24"
                        >
                          <path d="M43.5 48c-.4 0-.8-.2-1.1-.4L24 29 5.6 47.6c-.4.4-1.1.6-1.6.3-.6-.2-1-.8-1-1.4v-45C3 .7 3.7 0 4.5 0h39c.8 0 1.5.7 1.5 1.5v45c0 .6-.4 1.2-.9 1.4-.2.1-.4.1-.6.1zM24 26c.8 0 1.6.3 2.2.9l15.8 16V3H6v39.9l15.8-16c.6-.6 1.4-.9 2.2-.9z"></path>
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
                <div
                  onClick={() => setShowLike((prev) => !prev)}
                  class="font-semibold text-sm mx-4 mt-2 mb-4"
                >
                  {likes.length} likes
                </div>
              </div>

              {/* Right Column */}
              <div
                class="col-span-12 md:col-span-6 xl:col-span-6 "
                style={{ maxHeight: "500px" }}
              >
                <h2 class="text-lg font-bold mb-2">Comments</h2>
                {comments.length > 0 ? (
                  <div
                    class="bg-white shadow px-3 py-2 flex flex-col space-y-2 overflow-y-auto"
                    style={{ maxHeight: "380px", minHeight: "380px" }}
                  >
                    {comments.map((comment, index) => (
                      <div
                        key={comment._id}
                        class="flex items-center space-x-2"
                      >
                        <div class="group relative flex flex-shrink-0 self-start cursor-pointer">
                          <img
                            src={comment.author?.image}
                            alt=""
                            class="h-8 w-8 object-fill rounded-full"
                          />
                        </div>

                        <div class="flex items-center justify-center space-x-2">
                          <div class="block">
                            <div class="flex justify-center items-center space-x-2">
                              <div class="bg-gray-100 w-auto rounded-xl px-2 pb-2">
                                <div class="font-medium">
                                  <a href="#" class="hover:underline text-sm">
                                    <small>{comment.author?.username}</small>
                                  </a>
                                </div>
                                <div class="text-xs">{comment.comment}</div>
                              </div>
                              <div
                                onClick={() => handleCommentDelete(comment._id)}
                                class="self-stretch flex justify-center items-center transform transition-opacity duration-200 opacity-0 hover:opacity-100">
                                <a href="#" class="">
                                  <div class="text-xs cursor-pointer flex h-6 w-6 transform transition-colors duration-200 hover:bg-gray-100 rounded-full items-center justify-center">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="512"
                                      height="512"
                                      viewBox="0 0 512 512"
                                      id="trash"
                                    >
                                      <path d="M413.7 133.4c-2.4-9-4-14-4-14-2.6-9.3-9.2-9.3-19-10.9l-53.1-6.7c-6.6-1.1-6.6-1.1-9.2-6.8-8.7-19.6-11.4-31-20.9-31h-103c-9.5 0-12.1 11.4-20.8 31.1-2.6 5.6-2.6 5.6-9.2 6.8l-53.2 6.7c-9.7 1.6-16.7 2.5-19.3 11.8 0 0-1.2 4.1-3.7 13-3.2 11.9-4.5 10.6 6.5 10.6h302.4c11 .1 9.8 1.3 6.5-10.6zM379.4 176H132.6c-16.6 0-17.4 2.2-16.4 14.7l18.7 242.6c1.6 12.3 2.8 14.8 17.5 14.8h207.2c14.7 0 15.9-2.5 17.5-14.8l18.7-242.6c1-12.6.2-14.7-16.4-14.7z"></path>
                                    </svg>{" "}
                                  </div>
                                </a>
                              </div>
                            </div>
                            <div class="flex justify-start items-center text-xs w-full">
                              <div class="font-semibold text-gray-700 px-2 flex items-center justify-center space-x-1">
                                <a href="#" class="hover:underline">
                                  <small>Like</small>
                                </a>
                                <small class="self-center">.</small>
                                <a href="#" class="hover:underline">
                                  <small>
                                    <button
                                      onClick={() =>
                                        handleReplyClick(comment._id)
                                      }
                                    >
                                      Reply
                                    </button>
                                  </small>
                                </a>
                                <small class="self-center">.</small>
                                <a href="#" class="hover:underline">
                                  <small>
                                    {formatDistanceToNow(
                                      new Date(comment.createdAt),
                                      { addSuffix: true }
                                    )}
                                  </small>
                                </a>
                              </div>
                            </div>

                            {comment.replies.length > 0 &&
                              comment.replies.map((r, index) => (
                                <div
                                  key={index}
                                  class="flex items-center space-x-2 space-y-2"
                                >
                                  <div class="group relative flex flex-shrink-0 self-start cursor-pointer pt-2">
                                    <img
                                      src={r.author?.image}
                                      alt=""
                                      class="h-8 w-8 object-fill rounded-full"
                                    />
                                  </div>
                                  <div class="flex items-center justify-center space-x-2">
                                    <div class="block">
                                      <div class="bg-gray-100 w-auto rounded-xl px-2 pb-2">
                                        <div class="font-medium">
                                          <a
                                            href="#"
                                            class="hover:underline text-sm"
                                          >
                                            <small>{r.author?.username}</small>
                                          </a>
                                        </div>
                                        <div class="text-xs">{r?.reply}</div>
                                      </div>
                                      <div class="flex justify-start items-center text-xs w-full">
                                        <div class="font-semibold text-gray-700 px-2 flex items-center justify-center space-x-1">
                                          <a href="#" class="hover:underline">
                                            <small>Like</small>
                                          </a>
                                          <small class="self-center">.</small>
                                          <a href="#" class="hover:underline">
                                            <small>Reply</small>
                                          </a>
                                          <small class="self-center">.</small>
                                          <a
                                            href="#"
                                            className="hover:underline"
                                          >
                                            <small>
                                              {formatDistanceToNow(
                                                new Date(r.createdAt),
                                                { addSuffix: true }
                                              )}
                                            </small>
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    onClick={() =>
                                      handleDeleteReply(
                                        postId,
                                        comment._id,
                                        r._id
                                      )
                                    }
                                    class="self-stretch flex justify-center items-center transform transition-opacity duration-200 opacity-0 translate -translate-y-2 hover:opacity-100">
                                    <a href="#" class="">
                                      <div class="text-xs cursor-pointer flex h-6 w-6 transform transition-colors duration-200 hover:bg-gray-100 rounded-full items-center justify-center">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="512"
                                          height="512"
                                          viewBox="0 0 512 512"
                                          id="trash"
                                        >
                                          <path d="M413.7 133.4c-2.4-9-4-14-4-14-2.6-9.3-9.2-9.3-19-10.9l-53.1-6.7c-6.6-1.1-6.6-1.1-9.2-6.8-8.7-19.6-11.4-31-20.9-31h-103c-9.5 0-12.1 11.4-20.8 31.1-2.6 5.6-2.6 5.6-9.2 6.8l-53.2 6.7c-9.7 1.6-16.7 2.5-19.3 11.8 0 0-1.2 4.1-3.7 13-3.2 11.9-4.5 10.6 6.5 10.6h302.4c11 .1 9.8 1.3 6.5-10.6zM379.4 176H132.6c-16.6 0-17.4 2.2-16.4 14.7l18.7 242.6c1.6 12.3 2.8 14.8 17.5 14.8h207.2c14.7 0 15.9-2.5 17.5-14.8l18.7-242.6c1-12.6.2-14.7-16.4-14.7z"></path>
                                        </svg>
                                      </div>
                                    </a>
                                  </div>
                                </div>
                              ))}

                            {replyingTo === comment._id && (
                              <div class="flex items-center space-x-2 space-y-2">
                                <div class="group relative flex flex-shrink-0 self-start cursor-pointer pt-2">
                                  <img
                                    src={user.image}
                                    alt=""
                                    class="h-8 w-8 object-fill rounded-full"
                                  />
                                </div>

                                <div class="flex items-center justify-center space-x-2">
                                  <div class="block">
                                    <div class="bg-gray-300 w-auto rounded-xl px-2 pb-2">
                                      <div class="font-medium">
                                        <a
                                          href="#"
                                          class="hover:underline text-sm"
                                        >
                                          <small>{user.username}</small>
                                        </a>
                                      </div>
                                      <div class="text-xs">
                                        {reply}
                                        <button
                                          type="button"
                                          onClick={() => {
                                            setReplyingTo(false);
                                            setReply("");
                                          }}
                                          class="bg-gray-300 rounded-md p-2 inline-flex items-center justify-center text-gray-800 hover:text-gray-500focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                                        >
                                          <span class="sr-only">
                                            Close menu
                                          </span>
                                          <svg
                                            class="h-2 w-2"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            aria-hidden="true"
                                          >
                                            <path
                                              stroke-linecap="round"
                                              stroke-linejoin="round"
                                              stroke-width="2"
                                              d="M6 18L18 6M6 6l12 12"
                                            />
                                          </svg>
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div class="self-stretch flex justify-center items-center transform transition-opacity duration-200 opacity-0 translate -translate-y-2 hover:opacity-100">
                                  <a href="#" class="">
                                    <div class="text-xs cursor-pointer flex h-6 w-6 transform transition-colors duration-200 hover:bg-gray-100 rounded-full items-center justify-center">
                                      <svg
                                        class="w-4 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          stroke-width="2"
                                          d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                                        ></path>
                                      </svg>
                                    </div>
                                  </a>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div
                    class="bg-white shadow px-3 py-2 flex flex-col space-y-2 overflow-y-auto"
                    style={{ maxHeight: "380px", minHeight: "380px" }}
                  >
                    <p>No comments yet...</p>
                  </div>
                )}

                <div class="mt-6 p-4 bg-gray-100 flex items-center">
                  {replyingTo ? (
                    <textarea
                      ref={replyTextareaRef}
                      value={reply}
                      onChange={(e) => setReply(e.target.value)}
                      class="flex-grow h-12 border-gray-300 rounded-md p-2"
                      placeholder="Write your reply here..."
                    ></textarea>
                  ) : (
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      class="flex-grow h-12 border-gray-300 rounded-md p-2"
                      placeholder="Write your comment here..."
                    ></textarea>
                  )}
                  <button
                    onClick={replyingTo ? handleReply : handleComment}
                    class="px-4 py-2 ml-4 bg-blue-500 text-white rounded-md hover:bg-blue-800"
                  >
                    <span class="[&>svg]:h-5 [&>svg]:w-5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 496 512"
                      >
                        <path d="M248 8C111 8 0 119 0 256S111 504 248 504 496 393 496 256 385 8 248 8zM363 176.7c-3.7 39.2-19.9 134.4-28.1 178.3-3.5 18.6-10.3 24.8-16.9 25.4-14.4 1.3-25.3-9.5-39.3-18.7-21.8-14.3-34.2-23.2-55.3-37.2-24.5-16.1-8.6-25 5.3-39.5 3.7-3.8 67.1-61.5 68.3-66.7 .2-.7 .3-3.1-1.2-4.4s-3.6-.8-5.1-.5q-3.3 .7-104.6 69.1-14.8 10.2-26.9 9.9c-8.9-.2-25.9-5-38.6-9.1-15.5-5-27.9-7.7-26.8-16.3q.8-6.7 18.5-13.7 108.4-47.2 144.6-62.3c68.9-28.6 83.2-33.6 92.5-33.8 2.1 0 6.6 .5 9.6 2.9a10.5 10.5 0 0 1 3.5 6.7A43.8 43.8 0 0 1 363 176.7z" />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PostDetail;
