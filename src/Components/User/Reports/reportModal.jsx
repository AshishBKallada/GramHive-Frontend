import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import ReasonModal from "./ReasonModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function ReportModal({type, Id, reportModal, setReportModal }) {

  const [reasonModal, setReasonModal] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const handleOpen = () => setReportModal((prev) => !prev);

  const handleContinue = () => {
    if (selectedValue) {
      setReasonModal(true);
    } else {
      toast("Please select an option to continue", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const options = [
    "Spam",
    "Harassment or Bullying",
    "Hate Speech or Symbols",
    "False Information",
    "Violence or Threats",
    "Nudity or Sexual Content",
    "Self-Harm or Suicide",
    "Child Exploitation",
  ];

  return (
    <>
      {reasonModal ? (
        <ReasonModal
        type={type}
          Id={Id}
          category={selectedValue}
          setReportModal={setReportModal}
          reasonModal={reasonModal}
          setReasonModal={setReasonModal}
        />
      ) : (
        <Dialog open={reportModal} handler={handleOpen}>
          <ToastContainer />
          <DialogHeader>Report Post ?</DialogHeader>
          <p className="ml-6">
            Please select one of the following to continue !
          </p>

          <DialogBody>
            <nav className="flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700">
              {options.map((option, index) => (
                <div
                  key={index}
                  role="button"
                  className="flex items-center w-full p-0 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
                >
                  <label
                    htmlFor={`option-${index}`}
                    className="flex items-center w-full px-3 py-2 cursor-pointer"
                  >
                    <div className="grid mr-3 place-items-center">
                      <div className="inline-flex items-center">
                        <label
                          className="relative flex items-center p-0 rounded-full cursor-pointer"
                          htmlFor={`option-${index}`}
                        >
                          <input
                            id={`option-${index}`}
                            type="radio"
                            value={option}
                            checked={selectedValue === option}
                            onChange={(e) => setSelectedValue(e.target.value)}
                            className="peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-0"
                          />
                          <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-3.5 w-3.5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              stroke="currentColor"
                              strokeWidth="1"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          </span>
                        </label>
                      </div>
                    </div>
                    <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                      {option}
                    </p>
                  </label>
                </div>
              ))}
            </nav>
          </DialogBody>

          <DialogFooter>
            <Button variant="text" color="red" onClick={handleOpen}>
              Cancel
            </Button>
            <Button variant="gradient" color="blue" onClick={handleContinue}>
              Continue
            </Button>
          </DialogFooter>
        </Dialog>
      )}
    </>
  );
}
