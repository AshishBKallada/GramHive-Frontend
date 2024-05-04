import React, { useState } from 'react';
import UploadPost from '../UploadPost/UploadPost';

const CardComponent = ({ initialImages }) => {
  const [images, setImages] = useState(initialImages);

  const deleteImage = (name) => {
    console.log('ID', name);
    setImages(images.filter(image => image.name !== name));
  };

  const changeOrder = (dragIndex, hoverIndex) => {
    const newImages = [...images];
    const draggedImage = newImages[dragIndex];
    newImages.splice(dragIndex, 1);
    newImages.splice(hoverIndex, 0, draggedImage);
    setImages(newImages);
  };

  const [next, setNext] = useState(false)

  if (next) {
    return (
      <>
        <UploadPost initialImages={images} />
      </>
    )
  }

  return (
    <>
      <div className="relative min-h-screen flex items-center justify-center">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-50 z-10"></div>

        {/* Content */}
        <div className="relative z-20 sm:max-w-lg w-full p-10 bg-white rounded-xl">
          <div className="text-center">
            <h2 className="mt-5 text-3xl font-bold text-gray-900">Create Post!</h2>
            <p className="mt-2 text-sm text-gray-400">Lorem ipsum is placeholder text.</p>
          </div>

          <div className="flex  h-52 justify-center">
            {images.map((image, index) => (
              <div
                key={image.id}
                className="m-2 p-1 h-10 bg-gray-100 rounded shadow-md relative"
                draggable
                onDragStart={(e) => e.dataTransfer.setData('text/plain', index)}
                onDragOver={(e) => { e.preventDefault(); }}
                onDrop={(e) => {
                  e.preventDefault();
                  const dragIndex = Number(e.dataTransfer.getData('text/plain'));
                  const hoverIndex = index;
                  if (dragIndex !== hoverIndex) {
                    changeOrder(dragIndex, hoverIndex);
                  }
                }}
              >
                <button
                  onClick={() => deleteImage(image.name)}
                  className="absolute top-0 right-0 m-1  text-white px-2 py-1 rounded-full hover:bg-red-600 focus:outline-none"
                >
                  X
                </button>
                <img                 style={{ width: '100px', height: '100px' }} 
                  src={URL.createObjectURL(image)}
                  alt={image.name}
                  className="w-full h-auto"
                />
              </div>
            ))}
          </div>
          <div>
            <button onClick={() => setNext(prev => !prev)} type="submit" className="my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4 rounded-full tracking-wide font-semibold focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300">
              Continue
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardComponent;
