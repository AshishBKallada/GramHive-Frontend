import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';


function SearchModal({ onClickOutside }) {
  const ref = useRef(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside && onClickOutside();
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [onClickOutside]);

  const handleSearch = async (query) => {
    try {
      const response = await fetch(`https://gramhive6.vercel.app/searchuser/${query}`);
      if (response.ok) {
        const userData = await response.json();
        setSearchResults(userData);
        console.log(userData)
      }
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };

  const handleChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim() === '') {
      setSearchResults([]);
    } else {
      handleSearch(query);
    }
  };

  return (
    <div ref={ref} className="fixed z-50 flex items-center justify-end">
      <div className="bg-white rounded-lg overflow-hidden shadow-lg max-w-xs">
        <div className="p-4 border-b border-gray-200">
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleChange}
          />
        </div>
        <div className="p-4 max-h-[10rem] overflow-y-auto">

          {searchResults.map((user, index) => (
            <Link key={index} to={`/userprofile/${user._id}`} className="block">
              <div key={index} className="flex items-center border-b hover:border-gray-400 hover:bg-gray-800 hover:text-white rounded-lg p-1">
                <img src={user.image} alt={user.username} className="w-10 h-10 rounded-full mr-4" />
                <div style={{ display: 'flex', flexDirection: 'column' }} >
                  <span>{user.username}</span>
                  <span className="text-xs text-gray-500">{user.name}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchModal;
