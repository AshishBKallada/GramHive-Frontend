import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin } from "../../../redux/adminAuthSlice";
import { useToast } from "@chakra-ui/react";
import { AdminAuthContext } from "../../../Context/AdminAuthContext";

const LoginAdmin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const toast = useToast();
  const { setAdminToken } = useContext(AdminAuthContext);

  const validateForm = () => {
    const errors = {};
    if (!email.trim()) {
      errors.email = "Please enter your email.";
    }
    if (!password.trim()) {
      errors.password = "Please enter your password.";
    }
    return errors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      dispatch(adminLogin({ email, password }))
        .then((response) => {
          if (adminLogin.fulfilled.match(response)) {
            toast({
              description: "Login Successful",
              status: "success",
              position: "top",
              duration: 3000,
              isClosable: true,
            });
            setAdminToken(response.payload.token);
          } else if (adminLogin.rejected.match(response)) {
            throw new Error(response.payload?.message || "An error occurred");
          }
        })
        .catch((error) => {
          toast({
            description: error.message || "An error occurred",
            status: "warning",
            position: "top",
            duration: 3000,
            isClosable: true,
          });
        });
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className='bg-[url("https://res.cloudinary.com/daufwc1ph/image/upload/v1709646134/assets/svg/loginBG.svg")] bg-cover bg-no-repeat'>
      <div className="flex justify-center h-screen">
        <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
          <div className="flex-1">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-center text-white">
                GramHive
              </h2>
              <p className="mt-3 text-gray-300">
                Sign in to access your account
              </p>
            </div>
            <div className="mt-8">
              <form>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm text-gray-300"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="example@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.email ? "border-red-500" : "border-gray-200"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
                <div className="mt-6">
                  <div className="flex justify-between mb-2">
                    <label htmlFor="password" className="text-sm text-gray-300">
                      Password
                    </label>
                  </div>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.password ? "border-red-500" : "border-gray-200"
                    }`}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>
                <div className="mt-6">
                  <button
                    onClick={handleLogin}
                    className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                  >
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginAdmin;
