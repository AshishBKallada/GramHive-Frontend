
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserProfile } from "../../../redux/userAuthSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "../../External/LoadingSpinner";

function EditProfile() {
  const user = useSelector((state) => state.user);
  const loading = useSelector((state) => state.user.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    userId: user.user._id,
    username: user.user.username,
    name: user.user.name,
    website: user.user.website,
    bio: user.user.bio,
    image: "",
    gender: user.user.gender,
  });

  const handleChange = (e) => {
    if (e.target.name === "image") {
      const selectedImage = e.target.files[0];
      setUserData({ ...userData, image: selectedImage });
    } else {
      setUserData({ ...userData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("userId", userData.userId);
    formData.append("username", userData.username);
    formData.append("name", userData.name);
    formData.append("website", userData.website);
    formData.append("bio", userData.bio);
    formData.append("image", userData.image);
    formData.append("gender", userData.gender);

    try {
      await dispatch(updateUserProfile(formData));
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="p-4">
      <ToastContainer autoClose={1000} onClose={() => navigate("/profile")} />
      {loading ? (
        <LoadingSpinner />
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="w-full space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                This information will be displayed publicly so be careful what you share.
              </p>
              <div className="col-span-full">
                <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">Photo</label>
                <div className="mt-2 flex items-center gap-x-3">
                  <img
                    className="h-20 w-20 rounded-full"
                    src={
                      userData.image
                        ? URL.createObjectURL(userData.image)
                        : user.user.image
                          ? user.user.image.toString()
                          : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5OqxMapgWmHOW5iRqRICrYi0ozrogweWlzvoLPEuHnQ&s"
                    }
                    alt=""
                  />
                  <input
                    onChange={handleChange}
                    name="image"
                    type="file"
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:disabled:opacity-50 file:disabled:pointer-events-none dark:file:bg-blue-500 dark:hover:file:bg-blue-400"
                  />
                </div>
              </div>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Username</label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        onChange={handleChange}
                        type="text"
                        value={userData.username}
                        name="username"
                        id="username"
                        autoComplete="username"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="janesmith"
                      />
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Account Name</label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        onChange={handleChange}
                        value={userData.name}
                        name="name"
                        id="name"
                        autoComplete="name"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="janesmith"
                      />
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <label htmlFor="website" className="block text-sm font-medium leading-6 text-gray-900">Website</label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        onChange={handleChange}
                        value={userData.website}
                        type="text"
                        name="website"
                        id="website"
                        autoComplete="website"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="http://website.com"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-span-full">
                  <label htmlFor="bio" className="block text-sm font-medium leading-6 text-gray-900">Bio</label>
                  <div className="mt-2">
                    <textarea
                      onChange={handleChange}
                      value={userData.bio ? userData.bio : ""}
                      id="bio"
                      name="bio"
                      rows="3"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Write a few sentences about yourself.
                  </p>
                </div>
                <div className="sm:col-span-4">
                  <label htmlFor="gender" className="block text-sm font-medium leading-6 text-gray-900">Gender</label>
                  <div className="mt-2">
                    <select
                      onChange={handleChange}
                      value={userData.gender}
                      id="gender"
                      name="gender"
                      autoComplete="gender"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 mb-24 flex items-center justify-center gap-x-6">
              <button type="button" className="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
              <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default EditProfile;
