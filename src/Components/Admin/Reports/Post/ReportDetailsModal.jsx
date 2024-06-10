import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { Carousel } from "flowbite-react";
import BanModal from "./BanModal";

function ReportDetailsModal({ postDetails, setPostDetails }) {
  const [banModal, setShowBanModal] = useState(false);

  return (
    <div>
      {banModal && (
        <BanModal
          postId={postDetails.reportedPost._id}
          isBan={postDetails.reportedPost.isBan}
          open={banModal}
          setShowBanModal={setShowBanModal}
        />
      )}
      <Dialog
        className="bg-gray-800"
        open={postDetails}
        size="xl"
        handler={() => setPostDetails(null)}
      >
        <DialogHeader className="text-white">Report Details</DialogHeader>
        <DialogBody className="h-96 lg:h-[32rem] overflow-y-auto">
          <div className="flex flex-col lg:flex-row">
            <div className="h-64 sm:h-72 xl:h-80 2xl:h-96 w-full lg:w-1/2">
              <Carousel slideInterval={1500}>
                {postDetails.reportedPost.images.length > 0 &&
                  postDetails.reportedPost.images.map((image, index) => (
                    <img key={index} src={image} alt={`Image ${index}`} />
                  ))}
              </Carousel>
            </div>
            <div className="lg:w-1/2 h-64 sm:h-72 xl:h-80 2xl:h-96 overflow-y-auto ml-4 p-4 rounded-lg bg-gray-800">
              {postDetails.users.map((user, index) => (
                <div
                  key={index}
                  className="flex flex-col bg-gray-700 gap-4 mb-4 p-2 rounded-md"
                >
                  <div className="flex justify-between">
                    <div className="flex gap-2">
                      <img
                        className="w-7 h-7 rounded-full"
                        src={user.author.image}
                        alt=""
                      />
                      <span className="text-white">{user.author.username}</span>
                    </div>
                  </div>
                  <div className="text-white">{user.reason}</div>
                  <div className="flex justify-between text-white">
                    <span>{new Date(user?.createdAt).toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 text-xl text-white">
            <span className="bg-gray-500 rounded-md"> User feedback :</span>
            <span className="text-teal-300"> {postDetails?.response}</span>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="teal"
            onClick={() => setPostDetails(null)}
            className="mr-1"
          >
            <span>Close</span>
          </Button>
          <Button
            className="bg-red-500"
            color="green"
            onClick={() => setShowBanModal((prev) => !prev)}
          >
            <span>{postDetails.reportedPost.isBan ? "Unban" : "Ban"}</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export default ReportDetailsModal;
