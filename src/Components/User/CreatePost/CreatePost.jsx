import React, { useState, useEffect } from "react";
import CardComponent from "./Imagepreview";
import { useToast } from "@chakra-ui/react";


import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

function CreatePost({ handleOpen }) {
  const [images, setImages] = useState([]);
  const toast = useToast();

  const handleFileChange = (e) => {
    const files = e.target.files;
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Please select only image files (JPEG, PNG, GIF)",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
    }

    const fileArray = Array.from(files);
    setImages(fileArray);
  };

  useEffect(() => {
    console.log("Images", images);
  }, [images]);

  if (images.length > 0) {

    return <CardComponent initialImages={images} handleOpen={handleOpen} />;
  }

  return (
    <>
     <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Create New Post</DialogHeader>
        <DialogBody>
        <form className="mt-8 space-y-3" action="#" method="POST">
          <div className="grid grid-cols-1 space-y-2">
            <label className="text-sm font-bold text-gray-500 tracking-wide">
              Add images
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                <div className="h-full w-full text-center flex flex-col items-center justify-center">
                  <div className="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                    <img
                      className="has-mask h-36 object-center"
                      src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg"
                      alt="freepik image"
                    />
                  </div>
                  <p className="pointer-none text-gray-500">
                    <span className="text-sm">Drag and drop</span> files here{" "}
                    <br /> or{" "}
                    <a href="#" id="" className="text-blue-600 hover:underline">
                      select a file
                    </a>{" "}
                    from your computer
                  </p>
                </div>
                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>
        </form>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
      </>
    
  );
}

export default CreatePost;
