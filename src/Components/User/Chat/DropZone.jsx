import React, { useCallback, useContext, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useToast } from "@chakra-ui/react";
import { chatFileUpload } from "../../../services/services";
import { ChatState } from "../../../Context/ChatProvider";

function MyDropzone() {
  const [files, setFiles] = useState([]);
  const [previewModal, setPreviewModal] = useState(false);
  const toast = useToast();
  const {selectedChat} = ChatState();

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles);
    setPreviewModal(true);
  }, []);

  const handlePreviewModal = () => setPreviewModal((prev) => !prev);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const renderPreview = (file) => {
    const fileType = file.type.split("/")[0];

    if (fileType === "image") {
      return (
        <img
          src={URL.createObjectURL(file)}
          alt={file.name}
          className="w-32 h-32 object-cover mb-4"
        />
      );
    } else if (fileType === "video") {
      return (
        <video controls className="w-32 h-32 object-cover mb-4">
          <source src={URL.createObjectURL(file)} type={file.type} />
          Your browser does not support the video tag.
        </video>
      );
    } else if (fileType === "audio") {
      return (
        <div className="w-32 h-32 bg-gray-200 flex items-center justify-center mb-4">
          <audio controls>
            <source src={URL.createObjectURL(file)} type={file.type} />
            Your browser does not support the audio tag.
          </audio>
        </div>
      );
    } else {
      return (
        <div className="w-32 h-32 bg-gray-200 flex items-center justify-center mb-4">
          <a
            href={URL.createObjectURL(file)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            {file.name}
          </a>
        </div>
      );
    }
  };

  const handleFileUpload = async () => {
    if (files.length > 0) {
        handlePreviewModal()

      const response = await chatFileUpload(selectedChat._id,files);
      if (response.ok) {
        toast({
          title: "File sent successfully",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Failed to sent file !",
          status: "warning",
          duration: 2000,
          isClosable: true,
        });
      }
    }else{
        alert('no files selected');
    }
  };

  return (
    <div>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {
          <svg
            className="mx-auto mt-4"
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
          >
            <g id="Attach 01">
              <g id="Vector">
                <path
                  d="M14.9332 7.79175L8.77551 14.323C8.23854 14.8925 7.36794 14.8926 6.83097 14.323C6.294 13.7535 6.294 12.83 6.83097 12.2605L12.9887 5.72925M12.3423 6.41676L13.6387 5.04176C14.7126 3.90267 16.4538 3.90267 17.5277 5.04176C18.6017 6.18085 18.6017 8.02767 17.5277 9.16676L16.2314 10.5418M16.8778 9.85425L10.72 16.3855C9.10912 18.0941 6.49732 18.0941 4.88641 16.3855C3.27549 14.6769 3.27549 11.9066 4.88641 10.198L11.0441 3.66675"
                  stroke="#9CA3AF"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </g>
          </svg>
        }
      </div>

      {previewModal && (
        <Dialog open={previewModal} handler={handlePreviewModal}>
          <DialogHeader>File Preview</DialogHeader>
          <DialogBody>
          <div className="flex flex-row flex-wrap">
  {files.map((file, index) => (
    <div className="file-preview" key={index}>
      {renderPreview(file)}
    </div>
  ))}
</div>

          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handlePreviewModal}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
            <Button variant="gradient" color="green" onClick={handleFileUpload}>
              <span>Confirm</span>
            </Button>
          </DialogFooter>
        </Dialog>
      )}
    </div>
  );
}

export default MyDropzone;
