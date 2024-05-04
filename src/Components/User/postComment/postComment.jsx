import React from 'react';

function PostComment() {
    return (
        <div>
           <div className="absolute bottom-0 right-4 p-6 w-144">
  <div className="flex items-center border border-gray-300 rounded-lg p-2 w-96 md:w-144 lg:w-144"> 
    <input
      type="text"
      className="flex-1 px-3 py-2 border-0 focus:outline-none"
      placeholder="Add a comment..."
    />
    <button className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2">
      Post
    </button>
  </div>   
</div>

        </div>
    );
}

export default PostComment;
