import { useState } from "react";
import PreviewPosts from "./PreviewPosts";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import toast, { Toaster } from "react-hot-toast";

function AddPost1({ handleOpen }) {
  const [posts, setPosts] = useState([]);
  const [previewModal, setPreviewModal] = useState(false);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (posts.length + files.length > 5) {
      toast("A Maximum of only 5 files can be added.", {
        style: {
          background: "orange",
          color: "white",
        },
      });
      return;
    }
    setPosts((prev) => [...prev, ...files.slice(0, 5 - prev.length)]);
  };

  const handleDelete = (index) => {
    setPosts((prev) => prev.filter((_, i) => i !== index));
  };

  const handleContinue = () => {
    if (posts.length < 1) {
      toast.error("You must select at least one file", {
        style: {
          background: "orange",
          color: "white",
        },
      });
      return;
    }
    setPreviewModal(true);
  };
  return (
    <>
      {previewModal ? (
        <PreviewPosts
          posts={posts}
          setPreviewModal={setPreviewModal}
          handleOpen={handleOpen}
        />
      ) : (
        <Dialog size={"md"} open={true} handler={handleOpen}>
          <DialogHeader>Create New Post</DialogHeader>
          <DialogBody>
            <Toaster />
            <form className="mt-8 space-y-3">
              <div className="grid grid-cols-1 space-y-2">
                <label className="text-sm font-bold text-gray-500 tracking-wide">
                  Add images and videos
                </label>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="file-upload"
                    className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center"
                  >
                    <div className="h-full w-full text-center flex flex-col items-center justify-center">
                      <div className="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                        <img
                          className="has-mask h-36 object-center"
                          src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg"
                          alt="freepik image"
                        />
                      </div>
                      <p className="pointer-none text-gray-500">
                        <span className="text-sm">Drag and drop</span> files
                        here <br /> or{" "}
                        <a
                          href="#"
                          id=""
                          className="text-blue-600 hover:underline"
                        >
                          select files
                        </a>{" "}
                        from your computer
                      </p>
                    </div>
                    <input
                      id="file-upload"
                      type="file"
                      multiple
                      className="hidden"
                      accept="image/*,video/*"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
              </div>
            </form>
            <div className="flex space-x-4 mt-4 overflow-x-auto">
              {posts.length > 0 &&
                posts.map((file, index) => {
                  const fileURL = URL.createObjectURL(file);
                  return (
                    <div
                      key={index}
                      className="relative flex justify-center border-4 border-gray-300 rounded-lg p-1 transform transition-transform ease-in-out duration-300 hover:scale-105 hover:border-teal-300 group"
                    >
                      {file.type.startsWith("image/") && (
                        <img
                          src={fileURL}
                          alt={`preview-${index}`}
                          className="h-32 w-28"
                        />
                      )}
                      {file.type.startsWith("video/") && (
                        <video
                          src={fileURL}
                          controls
                          className="h-32 w-28 object-contain"
                        />
                      )}
                      <button
                        onClick={() => handleDelete(index)}
                        className="absolute top-1 right-1 text-red-500 rounded-full p-1 opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                          className="w-4 h-4 fill-current"
                        >
                          <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                        </svg>
                      </button>
                    </div>
                  );
                })}
            </div>
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
            <Button variant="gradient" color="green" onClick={handleContinue}>
              <span>Continue</span>
            </Button>
          </DialogFooter>
        </Dialog>
      )}
    </>
  );
}

export default AddPost1;
