import React, { useState } from "react";
import OTP from "../OTP/OTP";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GoogleAuth from "../GoogleAuth/GoogleAuth";
import { useDispatch } from "react-redux";
import { userSignup } from "../../../redux/userAuthSlice";
import { useNavigate } from "react-router-dom";
import { Card } from "flowbite-react";
import { CardBody, CardFooter, Typography } from "@material-tailwind/react";
import { useToast } from "@chakra-ui/react";

function SignupTest() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();


  const [userData, setUserData] = useState({
    next: false,
    name: "",
    username: "",
    email: "",
    password: "",
    image: "",
  });

  const [showOTP, setShowOTP] = useState(false);

  const signupData = { email, name, username, password };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "email":
        setEmail(value);
        setEmailError("");
        break;
      case "name":
        setName(value);
        setNameError("");
        break;
      case "username":
        setUsername(value);
        setUsernameError("");
        break;
      case "password":
        setPassword(value);
        setPasswordError("");
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hasError = false;

    if (!email) {
      setEmailError("Email is required");
      hasError = true;
    } else {
      setEmailError("");
    }

    if (!name) {
      setNameError("Name is required");
      hasError = true;
    } else {
      setNameError("");
    }

    if (!username) {
      setUsernameError("Username is required");
      hasError = true;
    } else {
      setUsernameError("");
    }

    if (!password) {
      setPasswordError("Password is required");
      hasError = true;
    } else {
      setPasswordError("");
    }

    if (!hasError) {
      try {
        console.log("1", signupData);
        setLoading(true);
        const response = await fetch("http://localhost:3000/sendmail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signupData),
        });

        if (response.status === 200) {
          setLoading(false);
          toast({
            title: "Email sent successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          setShowOTP(true);
        } else if (response.status === 400) {
            setLoading(false);
          toast({
            title: "Account already exists.",
            description: "A user with that email already exists.",
            status: "warning",
            duration: 3000,
            isClosable: true,
          });
        } else if (response.status === 500) {
          toast({
            title: "Failed to send email.",
            status: "warning",
            duration: 3000,
            isClosable: true,
          });
        } else {
          console.log("Unhandled status code:", response.status);
        }
      } catch (error) {
        console.error("Error sending email:", error);
      }
    }
  };
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const handleGoogleSignup = (e) => {
    if (!userData.name) {
    }
    if (!userData.username) {
    }
    try {
      const { name, email, password, username, image } = userData;
      console.log("....................", userData);
      dispatch(userSignup({ name, email, password, username, image }))
        toast({
            title: "Google signup successfull",
            status: "success",
            duration: 2000,
            isClosable: true,
          })
          navigate('/')
          
    } catch (error) {}
  };

  if (userData.next) {
    return (
      <>
        <ToastContainer position="top-center" autoClose={1500} />
        <Card className="mx-auto mt-[80px] shadow-md bg-blend-overlay w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              <center>
                <img
                  src="https://fontmeme.com/permalink/240410/fd6559317aad827d444e4eb8ec6b6469.png"
                  alt=""
                />
              </center>
              <center>
                <b className="text-2xl">Sign In</b>
              </center>
            </Typography>
            <div className="w-full h-auto">
              <center>
                <img
                  src={userData.image.toString()}
                  className="w-28 h-28 rounded-full border-2  p-1 shadow-lg shadow-[#23395d]"
                  alt=""
                />
              </center>
            </div>
            <center>
              <p className="text-[#451093] font-medium">
                Welcome <span className="underline">{userData.email}</span>
              </p>
            </center>
            <Typography className="-mb-2" variant="h6">
              Your Account Name
            </Typography>
            {/* <Input size="lg" /> */}
            <div class="relative z-0">
              <input
                type="text"
                name="name"
                onChange={handleChange}
                value={userData.name}
                id="floating_standard"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                for="floating_standard"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
              >
                Account Name
              </label>
            </div>
            <Typography className="-mb-2" variant="h6">
              Your Username.
            </Typography>
            <div class="relative z-0">
              <input
                type="text"
                name="username"
                onChange={handleChange}
                id="floating_standard"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                for="floating_standard"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
              >
                Username
              </label>
            </div>
            <div className="-ml-2.5">
              <input
                type="checkbox"
                className="ml-2 w-[16px] h-[16px] bg=[#23395d] focus:border-2 focus:border-[#23395d]"
              />
              <label htmlFor="checkbox" className="ml-2">
                Remember Me
              </label>
            </div>
          </CardBody>
          <CardFooter className="pt-0">
           
            <button
              onClick={handleGoogleSignup}
              className="bg-[#23395d] rounded-sm text-white font-medium w-full p-2 px-3"
            >
              Sign In
            </button>
            <Typography variant="small" className="mt-4 flex justify-center">
              Don&apos;t have an account?
              <Typography
                as="a"
                href="#signup"
                variant="small"
                color="red"
                className="ml-1 font-bold"
              >
                Sign up
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
      </>
    );
  }
  if (showOTP) {
    return (
      <>
        <ToastContainer position="top-center" autoClose={1500} />
        <OTP resendemail={signupData.email} />
      </>
    );
  }
  return (
    <div>
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
      <div class="h-screen md:flex">
        <div
          class="relative overflow-hidden md:flex w-1/2 i justify-around items-center hidden"
          style={{
            backgroundImage: `url(https://png.pngtree.com/thumb_back/fw800/background/20230930/pngtree-yellow-background-social-media-illustration-instagram-post-frame-and-icons-in-image_13513220.png)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div>
            <h1 class="text-white font-bold text-4xl font-sans">GramHive</h1>
            <p class="text-white mt-1">
              The most trending social media platform ever !
            </p>
            <button
              type="submit"
              class="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2"
            >
              Read More
            </button>
          </div>
          <div class="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div class="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div class="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div class="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        </div>
        <div class="flex md:w-1/2 justify-center py-10 items-center bg-white">

          <form class="bg-white" onSubmit={handleSubmit}>
            <h1 class="text-gray-800 font-bold text-2xl mb-1">Hello there !</h1>
            <p class="text-sm font-normal text-gray-600 mb-7">
              Welcome To GramHive     
                    <GoogleAuth type="signup" setUserData={setUserData} />

            </p>
            <div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clip-rule="evenodd"
                />
              </svg>
              <input
                onChange={handleInputChange}
                class="pl-2 outline-none border-none"
                type="text"
                name="email"
                id=""
                placeholder="Enter email"
              />
             {emailError && (
                <p className="text-xs text-red-500">{emailError}</p>
              )}
            </div>
            
            
            <div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                />
              </svg>
              <input
                onChange={handleInputChange}
                class="pl-2 outline-none border-none"
                type="text"
                name="name"
                id=""
                placeholder="Full Name"
              />
              {nameError && <p className="text-xs text-red-500">{nameError}</p>}
            </div>
            <div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
              <input
                onChange={handleInputChange}
                class="pl-2 outline-none border-none"
                type="text"
                name="username"
                id=""
                placeholder="Username"
              />
              {usernameError && (
                <p className="text-xs text-red-500">{usernameError}</p>
              )}
            </div>
            <div class="flex items-center border-2 py-2 px-3 rounded-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <input
                class="pl-2 outline-none border-none"
                type="text"
                name="password"
                id=""
                placeholder="Password"
                onChange={handleInputChange}
              />
              {passwordError && (
                <p className="text-xs text-red-500">{passwordError}</p>
              )}
            </div>
            <button
              type="submit"
              class="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
            >
              SignUp
            </button>
            <span
              onClick={() => navigate("/")}
              class="text-sm ml-2 hover:text-blue-500 cursor-pointer"
            >
              Already have an account ?
            </span>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupTest;
