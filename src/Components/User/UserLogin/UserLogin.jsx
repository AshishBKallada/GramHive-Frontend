import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogin, userLoginFailure } from "../../../redux/userAuthSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GoogleAuthTest from "../GoogleAuth/GoogleAuthTest";
import Cookies from "js-cookie";
import { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import { useLoginSuccess } from "../../../Functions/GoogleSignup/LoginSuccess";
import ForgotPasswordModal from "./forgotpass";
import { Button } from "flowbite-react";

function UserLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { setToken } = useContext(AuthContext);
  const error = useSelector((state) => state.user.error);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [passModal, setPassModal] = useState(false);

  const showToastAndNavigate = useLoginSuccess();

  const handleLogin = async (e) => {
    e.preventDefault();

    const minPasswordLength = 8;

    let hasError = false;

    if (!username.trim()) {
      setEmailError("Username is required");
      hasError = true;
    } else {
      setEmailError("");
    }
    if (!password) {
      setPasswordError("Password is required");
      hasError = true;
    } else if (password.length < 0) {
      setPasswordError(
        `Password must be at least ${minPasswordLength} characters long`
      );
      hasError = true;
    } else {
      setPasswordError("");
    }

    if (!hasError) {
      try {
        await dispatch(userLogin({ username, password })).then(
          ({ payload }) => {
            if (payload.status) {
              Cookies.set("token", payload.token, { expires: 7 });
              Cookies.set("refreshToken", payload.refreshToken, { expires: 7 });
            }
            const key = payload.status ? "success" : "error";
            toast[key](payload.message, {
              autoClose: 1000,
              onClose: () => {
                if (payload.status) {
                  setToken(payload.token);
                  navigate("/");
                }
              },
            });
          }
        );
      } catch (error) {
        console.error("Login failed:", error);
        setLoginError("Login failed. Please try again later.");
        dispatch(userLoginFailure("Login failed. Please try again later."));
      }
    }
  };

  const handlePassModal = () => {
    setPassModal((prev) => !prev);
  };

  return (
    <div>
      {passModal && <ForgotPasswordModal handleOpen={handlePassModal} />}
      <ToastContainer />

      <div
        style={{
          backgroundImage: `url('https://static.vecteezy.com/system/resources/previews/030/758/966/non_2x/creative-animal-concept-cheetah-wearing-sunglasses-on-yellow-background-copy-space-generative-ai-free-photo.jpg')`,
          backgroundSize: "cover",
          scrollbarWidth: "none",
        }}
        className="w-screen flex bg-right flex-col h-screen overflow-y-hidden"
      >
        <div className="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable">
          <div className="flex items-center justify-center w-full lg:p-12">
            <div className="flex items-center xl:p-10">
              <form className="flex flex-col w-full h-full pb-6 text-center rounded-3xl">
                <h3 className="mb-3 text-4xl font-extrabold text-dark-grey-900">
                  Sign In
                </h3>

                <GoogleAuthTest onLoginSuccess={showToastAndNavigate} />

                <div className="flex items-center mb-3">
                  <hr className="h-0 border-b border-solid border-grey-500 grow" />
                  <p className="mx-4 text-grey-600">or</p>
                  <hr className="h-0 border-b border-solid border-grey-500 grow" />
                </div>
                <label
                  htmlFor="email"
                  className="mb-2 text-sm text-start text-grey-900"
                >
                  Email*
                </label>

                <input
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setEmailError("");
                  }}
                  id="username"
                  type="text"
                  placeholder="Enter a username"
                  className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
                />
                {emailError && (
                  <span className="error text-red-600">{emailError}</span>
                )}
                <label
                  htmlFor="password"
                  className="mb-2 text-sm text-start text-grey-900"
                >
                  Password*
                </label>
                <input
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError("");
                  }}
                  id="password"
                  type="password"
                  placeholder="Enter a password"
                  className="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
                />
                {passwordError && (
                  <span className="error text-red-600">{passwordError}</span>
                )}

                <div className="flex flex-row justify-between mb-8 items-end justify-end">
                  <Button
                    onClick={handlePassModal}
                    className="mr-4 text-sm font-medium text-purple-blue-500"
                  >
                    Forget password?
                  </Button>
                </div>
                <button
                  onClick={handleLogin}
                  className="w-full px-6 py-5 mb-5 text-sm font-bold leading-none bg-indigo-500 text-white transition duration-300 md:w-96 rounded-2xl hover:bg-purple-blue-600 focus:ring-4 focus:ring-purple-blue-100 bg-purple-blue-500"
                >
                  Sign In
                </button>
                <p className="text-sm leading-relaxed text-grey-900">
                  Not registered yet?{" "}
                  <a
                    onClick={() => navigate("/signup")}
                    href="javascript:void(0)"
                    className="font-bold text-grey-700"
                  >
                    Create an Account
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="flex flex-wrap -mx-3 my-5">
        <div className="w-full max-w-full sm:w-3/4 mx-auto text-center">
          <p className="text-sm text-slate-500 py-1">
            Tailwind CSS Component from{" "}
            <a
              href="https://www.loopple.com/theme/motion-landing-library?ref=tailwindcomponents"
              className="text-slate-700 hover:text-slate-900"
              target="_blank"
            >
              Motion Landing Library
            </a>{" "}
            by{" "}
            <a
              href="https://www.loopple.com"
              className="text-slate-700 hover:text-slate-900"
              target="_blank"
            >
              Loopple Builder
            </a>
            .
          </p>
        </div>
      </div> */}
    </div>
  );
}

export default UserLogin;
