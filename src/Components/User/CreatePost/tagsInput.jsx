import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TagsInput = ({ predefinedTags, selectedTags, setSelectedTags }) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestedTags, setSuggestedTags] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value.toLowerCase().trim();
    setInputValue(value);

    if (value) {
      const matchedUsers = predefinedTags.filter((user) =>
        user.username.toLowerCase().includes(value)
      );
      setSuggestedTags(matchedUsers);
    } else {
      setSuggestedTags([]);
    }
  };

  const handleTagAddition = (tag) => {
    if (
      !selectedTags.some((selectedTag) => selectedTag.username === tag.username)
    ) {
      setSelectedTags([...selectedTags, tag]);
    } else {
      toast.error("User already tagged!", {
        autoClose: 1000,
      });
    }
    setInputValue("");
    setSuggestedTags([]);
  };

  const handleTagRemoval = (tag) => {
    setSelectedTags(selectedTags.filter((item) => item !== tag));
  };

  return (
    <div className="relative">
      <ToastContainer />
      <p
        id="tags-helper-text-explanation"
        className="mt-2 mb-2 text-sm text-gray-500 dark:text-gray-400"
      >
        Tag people ...
      </p>

      <input
        type="text"
        id="tags-input"
        placeholder="Add tags"
        value={inputValue}
        onChange={handleInputChange}
        className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
      {suggestedTags.length > 0 && (
        <div
          id="tags-suggestions"
          className="mt-2 bg-white border border-gray-300 rounded-lg shadow-md overflow-y-auto"
          style={{ maxHeight: "120px" }}
        >
          {suggestedTags.map((tag) => (
            <div
              key={tag._id}
              className="p-2 cursor-pointer hover:bg-teal-300 hover:text-white transition-colors duration-300"
              onClick={() => handleTagAddition(tag)}
            >
              {tag.username}
            </div>
          ))}
        </div>
      )}
    <div id="tags-container" className="mt-2 flex flex-wrap">
  {selectedTags.map((tag) => (
    <div
      key={tag._id}
      className="tag mr-2 mb-2 bg-teal-300 px-2 py-1 rounded-md flex items-center transition duration-300 ease-in-out transform hover:scale-105"
    >
      <span className="tag-text text-white">{tag.username}</span>
      <button
        className="bg-red-500 text-white w-4 h-4 ml-2 rounded-xl flex items-center justify-center"
        onClick={() => handleTagRemoval(tag)}
      >
        <span>-</span>
      </button>
    </div>
  ))}
</div>


    </div>
  );
};

export default TagsInput;
