import React, { useState, useEffect } from "react";
import { Alert } from "@material-tailwind/react";

function MtAlert({ msg, onClose }) {
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowAlert(false);
      onClose(); 
    }, 2000); 

    return () => clearTimeout(timeoutId);
  }, [onClose]);

  return (
    <div
      className={`fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-50 transition duration-300 ease-in-out ${
        !showAlert && "opacity-0 pointer-events-none"
      }`}
    >
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full md:w-1/2 z-50">
        {showAlert && (
          <Alert color="blue" className="rounded-md shadow-md">
            {msg}
          </Alert>
        )}
      </div>
    </div>
  );
}

export default MtAlert;
