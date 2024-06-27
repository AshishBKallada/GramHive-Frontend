import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import SearchSkelton from "../../Skeltons/SearchSkelton";

function Search({ onClickOutside, showSearch, setShowSearch }) {
  const ref = useRef(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const placeholders = new Array(5).fill(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside && onClickOutside();
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [onClickOutside]);

  const handleSearch = async (query) => {
    try {
      setLoading(true);
      setTimeout(async () => {
        const response = await fetch(
          `https://bassheads.shop/searchuser/${query}`
        );
        if (response.ok) {
          const userData = await response.json();
          setSearchResults(userData);
          console.log(userData);
        }
        setLoading(false);
      }, 2000);
    } catch (error) {
      setLoading(false);
      console.error("Error searching users:", error);
    }
  };

  const handleChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim() === "") {
      setSearchResults([]);
    } else {
      handleSearch(query);
    }
  };

  return (
    <div>
      <Dialog
        size="sm"
        open={showSearch}
        handler={() => setShowSearch((prev) => !prev)}
      >
        <DialogHeader>Search a user..</DialogHeader>
        <DialogBody>
          <div ref={ref} className="p-4 border-b border-gray-200">
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-teal-500"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleChange}
            />
          </div>
          <div className="p-6 max-h-[15rem] overflow-y-auto bg-white">
            {loading
              ? placeholders.map((_, index) => (
                  <div key={index} className="mb-4">
                    <SearchSkelton />
                  </div>
                ))
              : searchResults.map((user, index) => (
                  <Link
                    key={index}
                    to={`/userprofile/${user._id}`}
                    className="block"
                  >
                    <div className="flex items-center border-b-2 hover:border-gray-400 hover:bg-teal-300 hover:text-white rounded-lg p-2 h-20 transition ease-in-out duration-300 hover:scale-105">
                      <img
                        src={user.image}
                        alt={user.username}
                        className="w-12 h-12 rounded-full mr-4 transition transform ease-in-out duration-300 hover:scale-110"
                      />
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <span>{user.username}</span>
                        <span className="text-xs">
                          {user.name}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => setShowSearch((prev) => !prev)}
            className="mr-1"
          >
            <span>Close</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export default Search;
