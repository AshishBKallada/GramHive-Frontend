import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

function ReportDetails({ reportDetails, setReportDetails }) {
  return (
    <div>
      <Dialog
        className="bg-gray-900"
        open={!!reportDetails}
        handler={() => setReportDetails(null)}
      >
        <DialogHeader className="text-white">Report Details</DialogHeader>
        <DialogBody className="bg-gray-800 text-white">
          <div className="flex flex-col lg:flex-row items-start w-full">
            {/* User Profile Section */}
            <div className="w-full lg:w-1/3">
              <div className="max-w-xs mx-auto">
                <div className="bg-gray-700 shadow-xl rounded-lg py-3">
                  <div className="photo-wrapper p-2">
                    <img
                      className="w-32 h-32 rounded-full mx-auto"
                      src={reportDetails?.reportedUser?.image || "https://www.gravatar.com/avatar/2acfb745ecf9d4dccb3364752d17f65f?s=260&d=mp"}
                      alt={reportDetails?.reportedUser?.username || "User"}
                    />
                  </div>
                  <div className="p-2">
                    <h3 className="text-center text-xl font-medium leading-8 text-gray-200">
                      {reportDetails?.reportedUser?.username || "Unknown User"}
                    </h3>
                    <div className="text-center text-gray-400 text-xs font-semibold">
                      <p>{reportDetails?.reportedUser?.name || "No Name Provided"}</p>
                    </div>
                    <div className="text-center my-3">
                      <a
                        className="text-xs text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium"
                        href="#"
                      >
                        View Profile
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Reports Section */}
            <div className="w-full lg:w-2/3 h-64 sm:h-72 xl:h-80 2xl:h-96 overflow-y-auto ml-4 p-4 rounded-lg bg-gray-900">
              {reportDetails?.users && reportDetails.users.map((user, index) => (
                <div
                  key={index}
                  className="flex flex-col bg-gray-700 gap-4 mb-4 p-2 rounded-md"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2 items-center">
                      <img
                        className="w-7 h-7 rounded-full"
                        src={user.author.image || "https://www.gravatar.com/avatar/2acfb745ecf9d4dccb3364752d17f65f?s=260&d=mp"}
                        alt={user.author.username || "User"}
                      />
                      <span className="text-white">{user.author.username || "Unknown"}</span>
                    </div>
                  </div>
                  <div className="text-white">{user.reason || "No reason provided"}</div>
                  <div className="flex justify-between text-white text-sm">
                    <span>{new Date(user?.createdAt).toLocaleString() || "Unknown date"}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => setReportDetails(null)}
            className="mr-1"
          >
            <span>Close</span>
          </Button>
          {/* <Button
            variant="gradient"
            color="green"
            onClick={() => setReportDetails(null)}
          >
            <span>Confirm</span>
          </Button> */}
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export default ReportDetails;
