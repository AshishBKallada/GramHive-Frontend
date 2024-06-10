import React, { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react"; 
import { getMyAds } from "../../../services/services";

function Ads({ setOpenAdModal }) {
  const [ads, setAds] = useState([]);
  const toast = useToast(); 

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await getMyAds();
        setAds(response.data);
      } catch (error) {
        console.error("Error fetching ads:", error);
        toast({
          title: "Error fetching ads",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };
    fetchAds();
  }, [toast]);

  return (
    <div>
      <section className="relative py-16 bg-blueGray-50">
        <div className="w-full mb-12 px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-teal-300 text-white">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center justify-between">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-lg text-white">My Ads</h3>
                </div>
                <div>
                  <button
                    onClick={() => setOpenAdModal((prev) => !prev)}
                    className="ml-12 bg-blue-600 text-white hover:bg-blue-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-600 hover:border-transparent rounded"
                  >
                   + Add Ad
                  </button>
                </div>
              </div>
            </div>

            <div className="block w-full overflow-x-auto">
              <table className="items-center w-full bg-transparent border-collapse">
                <thead className="bg-black">
                  <tr>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-white text-teal-300 border-teal-700">
                     Title
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-white text-teal-300 border-teal-700">
                      Budget
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-white text-teal-300 border-teal-700">
                      Payment
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-white text-teal-300 border-teal-700">
                      Ad Images
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-white text-teal-300 border-teal-700">
                      Status
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-white text-teal-300 border-teal-700"></th>
                  </tr>
                </thead>
                <tbody>
                  {ads && ads.map((ad, index) => (
                    <tr key={index}>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {ad.title}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {ad.rate}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <i className="fas fa-circle text-emerald-500 mr-2"></i>
                        {ad.payment ? "Paid" : "Pending"}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <div className="flex">
                          {ad.images.map((image, idx) => (
                            <img
                              key={idx}
                              src={image.imageFile || "https://via.placeholder.com/50"}
                              alt="Ad Image"
                              className={`w-10 h-10 rounded-full border-2 border-blueGray-50 shadow ${idx > 0 ? '-ml-4' : ''}`}
                            />
                          ))}
                        </div>
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <div className="flex items-center">
                          <span className="mr-2">{ad.status?'accepted':'pending'}</span>
                          <div className="relative w-full">
                            <div className="overflow-hidden h-2 text-xs flex rounded bg-emerald-500">
                              <div
                                style={{ width: `${ad.completion}%` }}
                                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-500"
                              ></div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                        <a
                          href="#pablo"
                          className="text-blueGray-500 block py-1 px-3"
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="fas fa-ellipsis-v"></i>
                        </a>
                        <div className="hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48">
                          <a
                            href="#pablo"
                            className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                          >
                            Action
                          </a>
                          <a
                            href="#pablo"
                            className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                          >
                            Another action
                          </a>
                          <a
                            href="#pablo"
                            className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                          >
                            Something else here
                          </a>
                          <div className="h-0 my-2 border border-solid border-blueGray-100"></div>
                          <a
                            href="#pablo"
                            className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                          >
                            Separated link
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <footer className="relative pt-8 pb-6 mt-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center md:justify-between justify-center">
              <div className="w-full md:w-6/12 px-4 mx-auto text-center">
                <div className="text-sm text-blueGray-500 font-semibold py-1">
                 
                  <a
                    href="https://www.creative-tim.com/product/notus-js"
                    className="text-blueGray-500 hover:text-gray-800"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GramHive
                  </a>{" "}
                  {" "}
                  <a
                    href="https://www.creative-tim.com"
                    className="text-blueGray-500 hover:text-blueGray-800"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    2024
                  </a>
                  .
                </div>
              </div>
            </div>
          </div>
        </footer>
      </section>
    </div>
  );
}

export default Ads;
