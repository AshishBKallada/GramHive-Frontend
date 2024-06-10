// PostReports.js
import React, { useEffect, useState } from "react";
import { getPostReports } from "../../../../services/services";
import { Carousel } from "flowbite-react";
import BanModal from "./BanModal";
import { AnimatedTooltip } from "../../../External/AnimatedToolTip";
import ReportDetailsModal from "./ReportDetailsModal";

function PostReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [banModal, setBanModal] = useState(false);
  const [postId, setPostId] = useState("");
  const [isBan, setIsBan] = useState(null);
  const [postDetails, setPostDetails] = useState(null);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await getPostReports();
      console.log("data", response.data);
      setReports(response.data);
    } catch (err) {
      setError("Failed to fetch reports.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleShowBanModal = (postId, isBan) => {
    setBanModal(true);
    setPostId(postId);
    setIsBan(isBan);
  };

  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {banModal && (
        <BanModal
          postId={postId}
          isBan={isBan}
          open={banModal}
          setShowBanModal={setBanModal}
        />
      )}
      {postDetails && (
        <ReportDetailsModal
          postDetails={postDetails}
          setPostDetails={setPostDetails}
        />
      )}
      <div className="flex justify-center m-4">
        <div className="flex flex-wrap justify-center gap-4">
          {reports.length > 0 ? (
            reports.map((report) => (
              <div
                key={report._id}
                className="flex flex-col h-96 w-80 bg-gray-800 rounded-lg"
              >
                <Carousel slideInterval={1500}>
                  {report.reportedPost.images &&
                    report.reportedPost.images.map((image, index) => (
                      <img
                        className="rounded-lg rounded-b-none w-full h-36 object-cover"
                        key={index}
                        src={image}
                        alt={`Image ${index}`}
                        loading="lazy"
                      />
                    ))}
                </Carousel>
                <div className="flex justify-between px-3">
                  <span className="inline-block ring-4 bg-red-500 ring-gray-800 rounded-full text-xs font-medium tracking-wide text-gray-100 px-2 pt-0.5">
                    Latest Report
                  </span>
                  <span className="flex h-min space-x-1 items-center rounded-full text-gray-400 bg-gray-800 py-0.5 px-2 text-xs font-medium">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-blue-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 8a4 4 0 100-8 4 4 0 000 8zM5 14a4 4 0 00-4 4v1a1 1 0 001 1h16a1 1 0 001-1v-1a4 4 0 00-4-4H5z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="text-blue-500 font-semibold text-xs">
                      {report.users.length} reports
                    </p>
                  </span>
                </div>
                <div className="py-1.5 px-3">
                  <h1 className="text-lg font-medium leading-5 tracking-wide text-gray-300 hover:text-blue-500 cursor-pointer">
                    <a href="#">{report.users[0].category}</a>
                  </h1>
                </div>
                <div className="px-3 space-y-1">
                  <p className="text-gray-400 text-sm font-normal leading-4 tracking-wide">
                    {report.users[0].reason}
                  </p>
                  <button
                    onClick={() => setPostDetails(report)}
                    className="font-bold hover:text-blue-400 text-gray-100 text-sm"
                  >
                    read more...
                  </button>
                  {report.response ? (
                    <div
                      id="feedbackDiv"
                      className={`hidden md:block px-4 py-2 text-center text-white rounded-md ${
                        report.response ? "" : "opacity-0"
                      }`}
                    >
                      <h6 className="fa fa-check  font-extrabold text-xl text-green-700 "></h6><span> User feedback received{report.response && " "}</span>
                     
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                <div className="flex flex-row items-end h-full w-full px-3 mt-3">
                  <div className="flex border-t border-gray-700 w-full py-3">
                    <div className="flex items-center space-x-2 border-r border-gray-700 w-full">
                      <AnimatedTooltip users={report.users} />
                      <div>
                        <p className="text-xs font-semibold tracking-wide text-gray-200">
                          {report.author?.name}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center flex-shrink-0 px-2">
                      <div className="flex items-center space-x-1 text-gray-400">
                        <button
                          onClick={() =>
                            handleShowBanModal(
                              report.reportedPost._id,
                              report.reportedPost?.isBan
                            )
                          }
                          className="w-20 h-8 bg-red-500 text-white border rounded-md"
                        >
                          {report.reportedPost.isBan ? "Unban" : "Ban"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No reports found</p>
          )}
        </div>
      </div>
    </>
  );
}

export default PostReports;
