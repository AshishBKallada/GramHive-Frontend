import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TagsInput from "../CreatePost/tagsInput";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

const PostEditor = ({ post, setEditModal }) => {
  const [images, setImages] = useState(post.images);
  const [description, setDescription] = useState(post.caption);
  const [taggedPeople, setTaggedPeople] = useState(post.tags);
  const [predefinedTags, setPredefinedTags] = useState([]);
  const handleOpen = () => {
    setEditModal((prev) => !prev);
  };

  const navigate = useNavigate();

  const removeImage = (index) => {
    setImages((prevImages) => prevImages.filter((image, i) => i !== index));
  };

  const removeTaggedPerson = (index) => {
    setTaggedPeople((prevTaggedPeople) =>
      prevTaggedPeople.filter((taggedPerson, i) => i !== index)
    );
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://gramhive6.vercel.app/admin/users");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const predefinedTags = await response.json();
        setPredefinedTags(predefinedTags);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  const handlePostUpdate = async () => {
    try {
      const postId = post._id;
      const response = await axios.put(
        `https://gramhive6.vercel.app/posts/update/${postId}`,
        {
          description,
          images,
          taggedPeople,
        }
      );
      if (response.status === 200) {
        toast.success("Post updated successfully", {
          autoClose: 1500,
          onClose: () => {
            console.log("Post updated successfully");
            setEditModal(false);
            window.location.reload();
          },
        });
      } else {
        toast.success("Failed to update post", {
          autoClose: 1500,
          onClose: () => {
            console.log("Failed to update post");
            setEditModal(false);
            navigate("/profile");
          },
        });
        throw new Error("Failed to update post");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <>
      <Dialog size="md" open={true} handler={handleOpen}>
        <DialogHeader> Edit Post</DialogHeader>
        <DialogBody>
          <ToastContainer />

          <textarea
            className="description bg-gray-100 sec p-3 h-40 w-full border border-gray-300 outline-none"
            spellCheck="false"
            placeholder="Describe everything about this post here"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div id="preview" className="my-4 flex">
            {images.map((image, index) => (
              <div
                key={index}
                className="mr-4 relative w-32 h-32 object-cover rounded"
              >
                {image ? (
                  <img
                    src={image}
                    className="w-32 h-32 object-cover rounded"
                    alt={`Image ${index}`}
                  />
                ) : (
                  <svg
                    className="fill-current w-32 h-32 ml-auto pt-1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M15 2v5h5v15h-16v-20h11zm1-2h-14v24h20v-18l-6-6z" />
                  </svg>
                )}
                <button
                  onClick={() => removeImage(index)}
                  className="w-6 h-6 absolute text-center flex items-center top-0 right-0 m-2 text-white text-lg bg-red-500 hover:text-red-700 hover:bg-gray-100 rounded-full p-1"
                >
                  <span className="mx-auto">×</span>
                </button>
                <div className="text-xs text-center p-2">{image.size}</div>
              </div>
            ))}
          </div>
          <div className="mb-4">
            <TagsInput
              predefinedTags={predefinedTags}
              selectedTags={taggedPeople}
              setSelectedTags={setTaggedPeople}
            />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Close</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handlePostUpdate}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default PostEditor;
