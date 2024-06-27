import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import { Switch, Typography } from "@material-tailwind/react";
import TagsInput from "./tagsInput";
import { Carousel } from "flowbite-react";
import { addPost } from "../../../services/services";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function PreviewPosts({ posts, setPreviewModal, handleOpen }) {
  const [caption, setCaption] = useState("");
  const [isChecked, setIsChecked] = useState(true);
  const [predefinedTags, setPredefinedTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  const handleCaptionChange = (e) => setCaption(e.target.value);

  const fetchData = async () => {
    try {
      const response = await fetch("https://gramhive6.vercel.app/admin/users");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const predefinedTags = await response.json();
      setPredefinedTags(predefinedTags);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async () => {
    const formData = new FormData();

    posts.forEach((post) => formData.append("files", post));
    formData.append("caption", caption);

    selectedTags.forEach((tag) => {
      formData.append("tags", tag._id);
    });

    formData.append("isChecked", isChecked);

    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      const response = await addPost(formData, (progressEvent) => {
        const progress = (progressEvent.loaded / progressEvent.total) * 100;
        setProgress(progress);
      });
      if (response.data.success) {
        toast("New Post Added!", {
          style: {
            background: "teal",
            color: "white",
          },
          onClose: () => navigate("/profile"), 
        });
      } else {
        toast("Failed to add post !", {
          style: {
            background: "orange",
            color: "white",
          },
        });
      }
    } catch (error) {
      console.error("Error adding post:", error);
    }

    handleOpen();
    setPreviewModal(false);
  };

  const customCarouselStyles = {
    controlPrevNext: {
      color: "black",
    },
  };

  return (
    <Dialog size="lg" open={true} handler={() => setPreviewModal(false)}>
      <DialogHeader>Preview Post</DialogHeader>
      <DialogBody>
        <Toaster />
        <div className="flex flex-col xl:flex-row space-y-4 xl:space-y-0 xl:space-x-8 p-4">
          <div className="w-96 sm:w-[36rem] xl:w-[40rem] h-80 sm:h-96 xl:h-[32rem] 2xl:h-[32rem] mx-auto">
            <Carousel slideInterval={1500} customStyles={customCarouselStyles}>
              {posts.length > 0 &&
                posts.map((file, index) => {
                  const fileURL = URL.createObjectURL(file);
                  return (
                    <div
                      key={index}
                      className="flex justify-center items-center w-full h-full"
                    >
                      {file.type.startsWith("image/") && (
                        <img
                          src={fileURL}
                          alt={`preview-${index}`}
                          className="h-full w-full object-cover"
                        />
                      )}
                      {file.type.startsWith("video/") && (
                        <video
                          src={fileURL}
                          controls
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>
                  );
                })}
            </Carousel>
          </div>
          <div className="flex flex-col space-y-4 w-full xl:w-[28rem]">
            <div>
              <label
                htmlFor="caption"
                className="block text-lg font-medium text-gray-700"
              >
                Caption
              </label>
              <textarea
                id="caption"
                value={caption}
                onChange={handleCaptionChange}
                rows={5}
                className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="flex items-center">
              <Switch
                color="teal"
                defaultChecked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
                label={
                  <div>
                    <Typography color="blue-gray" className="font-medium">
                      Enable Commenting
                    </Typography>
                    <Typography
                      variant="small"
                      color="gray"
                      className="font-normal"
                    >
                      If turned off, people won't be able to comment on your
                      post!
                    </Typography>
                  </div>
                }
                containerProps={{
                  className: "-mt-5",
                }}
              />
            </div>
            <div>
              <TagsInput
                predefinedTags={predefinedTags}
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
              />
            </div>
            {progress > 0 && (
              <div className="mt-4">
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200">
                        Upload Progress
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-teal-600">
                        {progress.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-teal-200">
                    <div
                      style={{ width: `${progress}%` }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-500"
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={() => setPreviewModal(false)}
          className="mr-1"
        >
          <span>Back</span>
        </Button>
        <Button variant="gradient" color="green" onClick={handleSubmit}>
          <span>Confirm</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

export default PreviewPosts;
