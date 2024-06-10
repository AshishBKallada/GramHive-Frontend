import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TagsInput = ({predefinedTags,selectedTags,setSelectedTags}) => {
    const [inputValue, setInputValue] = useState('');
    const [suggestedTags, setSuggestedTags] = useState([]);

   

    const handleInputChange = (e) => {
        const value = e.target.value.toLowerCase().trim();
        setInputValue(value);
    
        if (value) {
            const matchedUsers = predefinedTags.filter(user => user.username.toLowerCase().includes(value));
            setSuggestedTags(matchedUsers);
        } else {
            setSuggestedTags([]);
        }
    };
    
    const handleTagAddition = (tag) => {
        if (!selectedTags.some(selectedTag => selectedTag.username === tag.username)) {
            setSelectedTags([...selectedTags, tag]);
           
        } else {
            toast.error('User already tagged!', {
                autoClose: 1000,
            });
        }
        if (inputValue.trim() !== '') {
            setInputValue('');
        }
        setSuggestedTags([]);
    };
    
    
    
    

    const handleTagRemoval = (tag) => {
        setSelectedTags(selectedTags.filter(item => item !== tag));
    };

    return (
        <div className="relative">
                        <ToastContainer  />
            <p id="tags-helper-text-explanation" className="mt-2 mb-2 text-sm text-gray-500 dark:text-gray-400">Tag people ...</p>

            <input
                type="text"
                id="tags-input"
                placeholder="Add tags"
                value={inputValue}
                onChange={handleInputChange}
                className="bg-gray-50 border-2 border-teal-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {suggestedTags.length > 0 && (
                <div id="tags-suggestions" className="mt-2 bg-white border border-gray-300 rounded-lg shadow-md" style={{ maxHeight: '180px', overflowY: 'auto' }}>
                   {suggestedTags.map(tag => (
    <div key={tag._id} className="p-2 cursor-pointer hover:bg-gray-100" onClick={() => { handleTagAddition(tag)  }}>
        {tag.username}
    </div>
))}


                </div>
            )}
           <div id="tags-container" className="mt-2 flex flex-wrap">
    {selectedTags.map(tag => (
        <div key={tag._id} className="tag mr-2 mb-2  bg-black px-2 py-1 rounded-md">
        <span className="tag-text text-white">{tag.username}</span>
        <button className="tag-close text-amber-800" onClick={() => handleTagRemoval(tag)}>x</button>
    </div>
    
    ))}
</div>


        </div>
    );
};

export default TagsInput;
