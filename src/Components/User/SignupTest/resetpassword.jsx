import { useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../../../services/services";

function ResetPassword() {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  const validatePassword = () => {
    const criteria = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!criteria.test(newPassword)) {
      setPasswordError(
        "Weak password. Must contain at least 1 uppercase, 1 number, and be at least 8 characters long."
      );
      return false;
    } else {
      setPasswordError("");
      return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePassword()) {
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }
    setPasswordError("");
    const {data} = await resetPassword(token,newPassword);
    if (data) {
      toast({
        title: "Password reset successfully !",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/");
    } else {
      toast({
        title: "Failed to reset password !",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleClear = () => {
    setNewPassword("");
    setConfirmPassword("");
    setPasswordError("");
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <div className="flex items-center space-x-2 mb-6">
          <img
            src="https://unsplash.it/40/40?image=883"
            alt="Lock Icon"
            className="rounded-full"
          />
          <h1 className="text-xl font-semibold">Change Password</h1>
        </div>
        <p className="text-sm text-gray-600 mb-6">
          Update password for enhanced account security.
        </p>

        <div>
          <label
            htmlFor="newPassword"
            className="text-sm font-medium text-gray-700 block mb-2"
          >
            New Password *
          </label>
          <input
            type="password"
            id="newPassword"
            className="password-input form-input block w-full border border-gray-300 rounded-md shadow-sm"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            onBlur={validatePassword}
            required
          />
        </div>
        <div>
          <label
            htmlFor="confirmPassword"
            className="text-sm font-medium text-gray-700 block mb-2"
          >
            Confirm New Password *
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="password-input form-input block w-full border border-gray-300 rounded-md shadow-sm"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {passwordError && (
          <div id="passwordCriteria" className="text-sm space-y-2 text-red-500">
            <p>{passwordError}</p>
          </div>
        )}
        <div id="passwordCriteria" class="text-sm space-y-2">
          <p class="text-red-500"> Password must contain:</p>
          <ul class="list-disc pl-5 space-y-1">
            <li>At least 1 uppercase</li>
            <li>At least 1 number</li>
            <li>At least 8 characters</li>
          </ul>
        </div>
        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={handleClear}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring focus:border-blue-300"
          >
            Clear All
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
          >
            Reset Password
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
