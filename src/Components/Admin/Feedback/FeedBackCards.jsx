import React, { useEffect, useState } from "react";
import { getReviews } from "../../../services/services";

function FeedBackCards() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews("all");
  }, []);

  const fetchReviews = async (filter) => {
    const response = await getReviews(filter);
    setReviews(response.data);
  };

  const handleOptionClick = async (filter) => {
    fetchReviews(filter)
  };

  const handleSave =() => {
    
  }

  return (
    <div className="bg-gray-950 flex justify-center items-center min-h-screen -mt-12">
      <div className="md:w-full w-full px-10 flex flex-col gap-2 p-5 bg-black text-white">
        <h1 className="py-5 text-2xl font-bold">Reviews</h1>
        <div className="flex bg-gray-600 bg-opacity-20 border border-gray-200 rounded-md">
          <ion-icon className="py-4 p-3" name="search-outline"></ion-icon>
          <input
            type="text"
            placeholder="Search Review"
            className="p-2 bg-transparent focus:outline-none w-full"
          />
        </div>

        <div className="flex flex-wrap gap-2 w-full py-2">
          <span
            onClick={()=>handleOptionClick("today")}
            className="px-2 p-1 hover:bg-blue-400 bg-gray-950 bg-opacity-30 rounded"
          >
            Today
          </span>
          <span
            onClick={()=>handleOptionClick("saved")}
            className="px-2 p-1 hover:bg-blue-400 bg-gray-950 bg-opacity-30 rounded"
          >
            Saved
          </span>
          <span
            onClick={()=>handleOptionClick("all")}
            className="px-2 p-1 hover:bg-blue-400 bg-gray-950 bg-opacity-30 rounded"
          >
            All
          </span>
        </div>

        <div className="flex flex-col gap-3 mt-10 h-96 overflow-y-auto">
          {reviews.map((review) => (
            <div className="flex flex-col gap-4 bg-gray-700 p-4 rounded-md">
              <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-red-500">
                    <img
                      className="rounded-full"
                      src={review.author.image}
                      alt=""
                    />
                  </div>
                  <span>{review.author.username}</span>
                </div>
                <div className="flex p-1 gap-1 text-orange-300">
                  <ion-icon name="star"></ion-icon>
                  <ion-icon name="star"></ion-icon>
                  <ion-icon name="star"></ion-icon>
                  <ion-icon name="star"></ion-icon>
                  <ion-icon name="star-half"></ion-icon>
                </div>
              </div>

              <div>{review.content}</div>

              <div className="flex justify-between items-center">
                <span>{new Date(review.createdAt).toLocaleString()}</span>
                <button
                onClick={(e)=>handleSave(review._id)}
                className="p-1 px-2 bg-gray-900 hover:bg-gray-950 border border-gray-950 bg-opacity-60 rounded-md">
                  <ion-icon name="share-outline"></ion-icon> Save
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <script src="https://unpkg.com/ionicons@5.0.0/dist/ionicons.js"></script>
    </div>
  );
}

export default FeedBackCards;
