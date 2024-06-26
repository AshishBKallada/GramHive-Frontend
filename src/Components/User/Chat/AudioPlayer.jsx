import React, { useRef, useState, useEffect } from 'react';

const CustomAudioPlayer = ({ src }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const handlePlayPause = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    const updateProgress = () => {
      const { currentTime, duration } = audioRef.current;
      setProgress((currentTime / duration) * 100);
    };

    if (isPlaying) {
      audioRef.current.addEventListener('timeupdate', updateProgress);
    } else {
      audioRef.current.removeEventListener('timeupdate', updateProgress);
    }
  }, [isPlaying]);

  const barHeights = [8, 12, 16, 10, 14, 8, 12, 16, 10, 14]; 

  return (
    <div className="flex items-center bg-white gap-4 p-1 border rounded-lg shadow-md h-12 w-40">
      <audio ref={audioRef} src={src} onEnded={() => setIsPlaying(false)}></audio>
      <button
        onClick={handlePlayPause}
        className="flex items-center justify-center w-10 h-10 bg-teal-600 text-white rounded-full focus:outline-none"
      >
        {isPlaying ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-7.016 4.036A1 1 0 016 14.305V9.695a1 1 0 011.736-.82l7.016 4.036a1 1 0 010 1.64z" />
          </svg>
        )}
      </button>
      <div className="w-full h-6 relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          viewBox="0 0 100 24"
          preserveAspectRatio="none"
          className="absolute top-0 left-0"
        >
          {barHeights.map((height, i) => (
            <rect
              key={i}
              x={(i * 10) + 1}
              y={24 - height}
              width={3} 
              height={height}
              fill="#D1D5DB" 
            />
          ))}
          {barHeights.map((height, i) => (
            <rect
              key={i}
              x={(i * 10) + 1}
              y={24 - height}
              width={3} 
              height={height}
              fill="#14B8A6" 
              style={{ display: i < progress / 10 ? 'block' : 'none' }}
            />
          ))}
        </svg>
      </div>
    </div>
  );
};

export default CustomAudioPlayer;
