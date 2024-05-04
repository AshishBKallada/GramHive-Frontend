import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function OTP() {
  const [otpValues, setOtpValues] = useState(['', '', '', '']);

  const inputs = useRef([]);

  const navigate = useNavigate();

  const focusNextInput = index => {
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

  const handleOTPsubmit =async () => {
    const otp = otpValues.join('');
    console.log('OTP:', otp);
    const response = await fetch(`http://localhost:3000/verifyotp`,{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({otp})
    })
    if(response.ok)
    {
      const data = await response.json();
      console.log('token',data.token);
      document.cookie = `token=${data.token}; path=/;`;
      toast.success('Successfully signed in')
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-50 bg-opacity-90 z-50">
                <ToastContainer position="top-center" autoClose={1500} />
      <div className="relative bg-white px-6 py-9 shadow-xl w-full max-w-md rounded-2xl">
        <div className="mx-auto flex flex-col space-y-6">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">Email Verification</div>
            <div className="text-sm font-medium text-gray-400">We have sent a code to your email ba**@dipainhouse.com</div>
          </div>

          <div className="flex flex-col space-y-6">
            <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
              {otpValues.map((value, index) => (
                <div key={index} className="w-16 h-16">
                  <input
                    ref={el => (inputs.current[index] = el)}
                    className="w-full h-full flex items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                    type="text"
                    name=""
                    id=""
                    value={value}
                    onChange={e => handleChange(e, index)}
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-col space-y-6">
              <button
                className="flex items-center justify-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
                onClick={handleOTPsubmit}
              >
                Verify Account
              </button>

              <div className="flex items-center justify-center text-sm font-medium space-x-1 text-gray-500">
                <p>Didn't receive code?</p>{' '}
                <a className="flex items-center text-blue-600" href="#" target="_blank" rel="noopener noreferrer">
                  Resend
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OTP;
