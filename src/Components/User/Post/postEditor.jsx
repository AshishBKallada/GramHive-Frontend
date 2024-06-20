import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TagsInput from '../CreatePost/tagsInput';
import { useNavigate } from 'react-router-dom';

const PostEditor = ({ post, setEditModal }) => {

  const [images, setImages] = useState(post.images);
  const [description, setDescription] = useState(post.caption);
  const [taggedPeople, setTaggedPeople] = useState(post.tags);
  const [predefinedTags, setPredefinedTags] = useState([]);

  const navigate = useNavigate();

  const removeImage = (index) => {
    setImages(prevImages => prevImages.filter((image, i) => i !== index));
  };

  const removeTaggedPerson = (index) => {
    setTaggedPeople(prevTaggedPeople => prevTaggedPeople.filter((taggedPerson, i) => i !== index));
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/admin/users');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const predefinedTags = await response.json();
        setPredefinedTags(predefinedTags);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  const handlePostUpdate = async () => {
    try {
      const postId = post._id;
      const response = await axios.put(`http://localhost:3000/posts/update/${postId}`, {
        description, images, taggedPeople
      })
      if (response.status === 200) {
        toast.success('Post updated successfully', {
          autoClose: 1500,
          onClose: () => {
            console.log('Post updated successfully');
            setEditModal(false);
            window.location.reload();          }
        });
      } else {
        toast.success('Failed to update post', {
          autoClose: 1500,
          onClose: () => {
            console.log('Failed to update post');
            setEditModal(false);
            navigate('/profile');
          }
        });
        throw new Error('Failed to update post');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  }


  return (
    <>
      <div className="bg-white editor mx-auto w-full md:w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-3xl">
        <ToastContainer />
        <div className="flex justify-between items-center">
          <div className="heading text-center font-bold text-2xl m-5 text-gray-800">Edit Post</div>
          <button onClick={() => setEditModal(false)} type="button" class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
            <span class="sr-only">Close menu</span>
            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <textarea className="description bg-gray-100 sec p-3 h-40 border border-gray-300 outline-none" spellCheck="false" placeholder="Describe everything about this post here" value={description} onChange={(e) => setDescription(e.target.value)} />

        {/* Preview images */}
        <div id="preview" className="my-4 flex">
          {images.map((image, index) => (
            <div key={index} className="mr-4 relative w-32 h-32 object-cover rounded">
              {image ? (
                <img src={image} className="w-32 h-32 object-cover rounded" alt={`Image ${index}`} />
              ) : (
                <svg className="fill-current w-32 h-32 ml-auto pt-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path d="M15 2v5h5v15h-16v-20h11zm1-2h-14v24h20v-18l-6-6z" />
                </svg>
              )}
              <button onClick={() => removeImage(index)} className="w-6 h-6 absolute text-center flex items-center top-0 right-0 m-2 text-white text-lg bg-red-500 hover:text-red-700 hover:bg-gray-100 rounded-full p-1">
                <span className="mx-auto">×</span>
              </button>
              <div className="text-xs text-center p-2">{image.size}</div>
            </div>
          ))}
        </div>

        {/* Tags */}
        <div className="mb-4">
          <TagsInput predefinedTags={predefinedTags} selectedTags={taggedPeople} setSelectedTags={setTaggedPeople} />

        </div>

        {/* Buttons */}
        <div onClick={handlePostUpdate} className="buttons flex justify-end">
          <div className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500">Post</div>
        </div>
      </div>
    </>
  );
};

export default PostEditor;
