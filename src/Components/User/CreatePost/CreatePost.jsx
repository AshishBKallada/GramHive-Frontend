import React from "react";
import { useState, useEffect } from "react";
import CardComponent from "../ImagePreview/Imagepreview";
import { useToast } from "@chakra-ui/react";

function CreatePost({ setshowCreate }) {
  const [images, setImages] = useState([]);
  const toast = useToast();

  const handleFileChange = (e) => {
    const files = e.target.files;

    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: 'Please select only image files (JPEG, PNG, GIF)',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
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
    return (
      <>
        <CardComponent initialImages={images} />
      </>
    );
  }
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>

      {/* Content */}
      <div className="relative z-20 sm:max-w-lg w-full p-10 bg-white rounded-xl">
        {/* Close button */}
        <button
          onClick={() => setshowCreate((prev) => !prev)}
          type="button"
          className="absolute top-0 right-0 m-4 bg-white rounded-md p-2 inline-flex items-center justify-end text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
        >
          <span className="sr-only">Close menu</span>
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="text-center">
          <h2 className="mt-5 text-3xl font-bold text-gray-900">
            Create Post!
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Lorem ipsum is placeholder text.
          </p>
        </div>
        <form className="mt-8 space-y-3" action="#" method="POST">
          {/* <div className="grid grid-cols-1 space-y-2">
            <label className="text-sm font-bold text-gray-500 tracking-wide">Caption</label>
            <input className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" type="text" placeholder="Enter a caption" />
          </div> */}
          <div className="grid grid-cols-1 space-y-2">
            <label className="text-sm font-bold text-gray-500 tracking-wide">
              Add images
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                <div className="h-full w-full text-center flex flex-col items-center justify-center items-center">
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

          {/* <div>
            <button type="submit" className="my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4 rounded-full tracking-wide font-semibold focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300">
              Continue
            </button>
          </div> */}
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
