import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userSignup, userSignupWithEmail } from "../../../redux/userAuthSlice";
import { useToast } from "@chakra-ui/react";
import { ResendOTP } from "../../../services/services";
import { formatTime } from "../../../Functions/FormatTime";

function OTP({ resendemail }) {
  const [otpValues, setOtpValues] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [Timer, setTimer] = useState(10);

  const inputs = useRef([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const toast = useToast();

  useEffect(() => {
    if (Timer > 0) {
      const timer = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [Timer]);

  const focusNextInput = (index) => {
    const nextIndex = index + 1;
    if (nextIndex < inputs.current.length) {
      inputs.current[nextIndex].focus();
    }
  };

  const handleChange = (e, index) => {
    const { value } = e.target;
    if (value && value.length === 1) {
      const newOtpValues = [...otpValues];
      newOtpValues[index] = value;
      setOtpValues(newOtpValues);
      focusNextInput(index);
    }
  };

  const handleOTPsubmit = async () => {
    const otp = otpValues.join("");
    await dispatch(userSignupWithEmail(otp));
    if (!user.error) {
      toast({
        title: "Logged in successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      navigate("/");
    } else {
      alert(user.error)
      toast({
        title: "Failed to sent successfully",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const handleResendOTP = async () => {
    setOtpValues(["", "", "", ""]);
    setLoading(true);
    const response = await ResendOTP(resendemail);

    if (response.status === 200) {
      setLoading(false);
      setTimer(10);
      toast({
        title: "OTP code resent",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    } else {
      setLoading(false);
      toast({
        title: "Failed to sent OTP code",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    }
  };

  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-50 bg-opacity-90 z-50">
      <ToastContainer position="top-center" autoClose={1500} />
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50">
          <div className="absolute inset-0 bg-white bg-opacity-50"></div>
          <img
            src="https://media.tenor.com/wpSo-8CrXqUAAAAi/loading-loading-forever.gif"
            alt="Loading..."
            className="w-10 h-10 z-10"
          />
        </div>
      )}
      <div className="relative bg-white px-6 py-9 shadow-xl w-full max-w-md rounded-2xl">
        <div className="mx-auto flex flex-col space-y-6">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">Email Verification</div>
            <div className="text-sm font-medium text-gray-400">
              We have sent a code to your email {resendemail}
            </div>
          </div>

          <div className="flex flex-col space-y-6">
            <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
              {Timer === 0 ? (
                <p>Ooops! Timeout Out</p>
              ) : (
                otpValues.map((value, index) => (
                  <div key={index} className="w-16 h-16">
                    <input
                      ref={(el) => (inputs.current[index] = el)}
                      className="w-full h-full flex items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      type="text"
                      name=""
                      id=""
                      value={value}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>
                ))
              )}
            </div>
            <span>
              {Timer > 0 && (
                <>
                  {formatTime(Timer)}
                  <span>s</span>
                </>
              )}
            </span>

            <div className="flex flex-col space-y-6">
              {Timer === 0 ? (
                <>
                  <p>Didn't receive code?</p>
                  <button
                    className="flex items-center justify-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
                    onClick={handleResendOTP}
                  >
                    Resend OTP
                  </button>
                </>
              ) : (
                <button
                  className="flex items-center justify-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
                  onClick={handleOTPsubmit}
                >
                  Verify Account
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OTP;
