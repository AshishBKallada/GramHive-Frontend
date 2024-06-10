import React, { useEffect, useState } from "react";
import { getUserReports } from "../../../../services/services";
import ReportDetails from "./ReportDetails";

function UserReports() {
  const [reports, setReports] = useState([]);
  const [reportDetails, setReportDetails] = useState(null);

  useEffect(() => {
    fetchUserReports();
  }, []);

  const fetchUserReports = async () => {
    const response = await getUserReports();
    setReports(response.data);
  };

  return (
    <>
      {reportDetails && (
        <ReportDetails
          reportDetails={reportDetails}
          setReportDetails={setReportDetails}
        />
      )}
      <div className="flex flex-wrap justify-center mt-10 space-x-4">
        {reports &&
          reports.map((report, index) => (
            <div
              key={index}
              className="w-64 bg-white shadow-md rounded-lg overflow-hidden m-2 relative"
            >
              <div className="w-2 bg-gray-800"></div>

              <div className="relative transform hover:-translate-y-2 transition ease-in-out duration-500 shadow-lg hover:shadow-2xl movie-item text-white movie-card">
                <div className="absolute inset-0 z-10 transition duration-300 ease-in-out bg-gradient-to-t from-black via-gray-900 to-transparent"></div>
                <div className="relative z-10 px-6 pt-6 space-y-4 movie_info">
                  <div className="poster__info w-full">
                    <div className="h-24"></div>
                    <div className="space-y-4 detail_info">
                      <div onClick={() => setReportDetails(report)} className="flex flex-col space-y-1 inner">
                        <a className="relative flex items-center w-min p-1 text-center text-white bg-red-500 rounded-full group hover:bg-red-700">
                          <svg 
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-8 h-8"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM9.555 7.168A1 1 0 0 0 8 8v4a1 1 0 0 0 1.555.832l3-2a1 1 0 0 0 0-1.664l-3-2z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          <div className="absolute transition-opacity opacity-0 duration-500 ease-in-out transform group-hover:opacity-100 group-hover:translate-x-12 text-lg font-bold text-white group-hover:pr-2">
                            View more
                          </div>
                        </a>
                        <h3 className="text-xl font-bold">
                          {report.reportedUser.username}
                        </h3>
                        <div className="text-base text-gray-400">
                          {report.reportedUser.name}
                        </div>
                      </div>

                      <div className="overview">
                        <div className="text-xs text-gray-400 mb-2">
                          Recent:
                        </div>
                        <p className="text-md text-gray-100 mb-4">
                          {report.users[0].category}
                        </p>
                        <p className="text-xs text-gray-100 mb-4">
                          {report.users[0].reason}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <img
                  className="absolute inset-0 w-full -translate-y-4"
                  src={report.reportedUser.image}
                  alt="User"
                />
                <div className="poster__footer flex flex-row relative pb-6 space-x-2 z-10">
                  <a
                    className="flex items-center py-1 px-2 rounded-full mx-auto text-white bg-red-500 hover:bg-red-700"
                    href="http://www.google.com/calendar/event?action=TEMPLATE&dates=20210915T010000Z%2F20210915T010000Z&text=Dune%20-%20Movie%20Premiere&location=http%3A%2F%2Fmoviedates.info&details=This%20reminder%20was%20created%20through%20http%3A%2F%2Fmoviedates.info"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div className="text-sm text-white ml-2">Ban User </div>
                  </a>
                </div>
              </div>
              <div className="absolute top-0 right-0 mt-2 mr-2 bg-red-500 text-white rounded-full px-3 py-1 text-sm font-bold">
                {report.users.length}
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default UserReports;
