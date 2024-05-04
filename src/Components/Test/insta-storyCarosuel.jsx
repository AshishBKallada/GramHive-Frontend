import React, { useState } from "react";
import './insta-story.css';

// Dummy data for user stories
const storiesData = [
  { id: 1, username: "user1", imageUrl: "https://blog.hootsuite.com/wp-content/uploads/2023/07/instagram-stories-18.jpeg" },
  { id: 2, username: "user2", imageUrl: "https://media.sproutsocial.com/uploads/2022/12/IMG_6187.png" },
  { id: 3, username: "user3", imageUrl: "https://media.sproutsocial.com/uploads/2022/12/IMG_6188.png" },
  // Add more stories as needed
];

function InstagramStoryViewer() {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  const handleNextStory = () => {
    setCurrentStoryIndex((prevIndex) => Math.min(prevIndex + 1, storiesData.length - 1));
  };

  const handlePrevStory = () => {
    setCurrentStoryIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleCenterStory = () => {
    // No action needed when clicking on the current story to center it
  };

  return (
    <div className="story-viewer-container">
      <button className="nav-button" onClick={handlePrevStory} disabled={currentStoryIndex === 0}>
        <span>&lt;</span>
      </button>
      <div className="story-container">
        {/* Previous Story Preview */}
        {currentStoryIndex > 0 && (
          <div className="story-preview previous">
            <img src={storiesData[currentStoryIndex - 1].imageUrl} alt="Previous Story" />
            <p>{storiesData[currentStoryIndex - 1].username}</p>
          </div>
        )}
        {/* Current Story */}
        <div className="current-story" onClick={handleCenterStory}>
          <img src={storiesData[currentStoryIndex].imageUrl} alt="Current Story" />
          <p>{storiesData[currentStoryIndex].username}</p>
        </div>
        {/* Next Story Preview */}
        {currentStoryIndex < storiesData.length - 1 && (
          <div className="story-preview next">
            <img src={storiesData[currentStoryIndex + 1].imageUrl} alt="Next Story" />
            <p>{storiesData[currentStoryIndex + 1].username}</p>
          </div>
        )}
      </div>
      <button className="nav-button" onClick={handleNextStory} disabled={currentStoryIndex === storiesData.length - 1}>
        <span>&gt;</span>
      </button>
    </div>
  );
}

export default InstagramStoryViewer;
