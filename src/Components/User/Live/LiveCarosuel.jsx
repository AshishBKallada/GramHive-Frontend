import { Carousel } from "flowbite-react";
import React from "react";
import { Dialog, DialogBody } from "@material-tailwind/react";
import { Link } from "react-router-dom";

function LiveModal({ liveModal, setLiveModal }) {
  const slides = [
    {
      image:
        "https://static.vecteezy.com/system/resources/thumbnails/002/016/010/original/futuristic-threshold-with-reflections-on-wall-and-floor-free-video.jpg",
      caption: "AI-Generated Futuristic Esport Background",
    },
    {
      image:
        "https://static.vecteezy.com/system/resources/thumbnails/012/678/563/small/abstract-futuristic-gaming-background-overlay-for-copy-space-metal-plate-wallpaper-for-live-streaming-monitor-display-vector.jpg",
      caption: "Live Stream Banner",
    },
    {
      image:
        "https://png.pngtree.com/background/20230623/original/pngtree-social-media-background-design-featuring-twitch-logo-in-3d-picture-image_3951928.jpg",
      caption: "Gradient Streamer Influencer Landing Page",
    },
  ];

  return (
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
      <Dialog
        open={liveModal}
        size={"lg"}
        handler={() => setLiveModal((prev) => !prev)}
      >
        <DialogBody className="relative">
          <Carousel slideInterval={1500}>
            {slides.map((slide, index) => (
              <div key={index} className="relative h-full w-full">
                <img
                  src={slide.image}
                  alt={`Slide ${index}`}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-gradient-to-b from-transparent to-black text-white text-4xl font-bold py-4 px-6 rounded text-center shadow-lg">
                    {slide.caption.split(" ").slice(0, 3).join(" ")}
                    <br />
                    {slide.caption.split(" ").slice(3).join(" ")}
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
          <Link
            to={'/live'}
            className="absolute bottom-12 left-12 bg-red-400 text-white py-2 px-4 rounded flex items-center space-x-2"
          >
            <span>Go Live</span>
            <img
              className="w-5 h-5"
              src="https://static.vecteezy.com/system/resources/previews/005/260/970/non_2x/live-stream-live-icon-live-streaming-icon-symbol-free-vector.jpg"
              alt="Live Icon"
            />
          </Link>
         
        </DialogBody>
      </Dialog>
    </div>
  );
}

export default LiveModal;
