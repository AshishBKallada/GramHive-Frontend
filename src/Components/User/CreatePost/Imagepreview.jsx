import React, { useState } from "react";
import UploadPost from "./UploadPost";

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

const CardComponent = ({ initialImages, handleOpen }) => {
  const [images, setImages] = useState(initialImages);

  const [openPreview, setOpenPreview] = useState(true);

  const handleOpenPreview = () => setOpenPreview((prev) => !prev);

  const deleteImage = (name) => {
    console.log("ID", name);
    setImages(images.filter((image) => image.name !== name));
  };

  const changeOrder = (dragIndex, hoverIndex) => {
    const newImages = [...images];
    const draggedImage = newImages[dragIndex];
    newImages.splice(dragIndex, 1);
    newImages.splice(hoverIndex, 0, draggedImage);
    setImages(newImages);
  };

  const handleBack =() => {
    setOpenPreview(prev=>!prev)
    handleOpen()
  }


  if (!openPreview) {
    return (
      <>
        <UploadPost initialImages={images} />
      </>
    );
  }

  return (
    <>
      <Dialog open={openPreview} handler={handleOpenPreview}>
        <DialogHeader>Create Post</DialogHeader>
        <DialogBody>
          <div className="flex  h-52 justify-center">
            {images.map((image, index) => (
              <div
                key={image.id}
                className="m-2 p-1 h-10 bg-gray-100 rounded shadow-md relative"
                draggable
                onDragStart={(e) => e.dataTransfer.setData("text/plain", index)}
                onDragOver={(e) => {
                  e.preventDefault();
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  const dragIndex = Number(
                    e.dataTransfer.getData("text/plain")
                  );
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
                <img
                  style={{ width: "100px", height: "100px" }}
                  src={URL.createObjectURL(image)}
                  alt={image.name}
                  className="w-full h-auto"
                />
              </div>
            ))}
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleBack}
            className="mr-1"
          >
            <span>Back</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={handleOpenPreview}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default CardComponent;
