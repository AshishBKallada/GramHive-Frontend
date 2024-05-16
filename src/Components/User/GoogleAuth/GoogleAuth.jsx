import { useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import { loadAuth2 } from "gapi-script";
import { useDispatch } from "react-redux";
import { userLogin } from "../../../redux/userAuthSlice";

const GoogleAuth = ({ type, setUserData }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    loadAuth2(
      window.gapi,
      "502311807627-emfijnj80jj7t6qvqjlfu0jagndimeej.apps.googleusercontent.com",
      "profile email"
    )
      .then((auth2) => {
        console.log("Google Auth2 loaded:", auth2);
      })
      .catch((error) => {
        console.error("Error loading Google Auth2:", error);
      });
  }, []);

  const responseGoogle = (response) => {
    const {
      wt: { Ad: username, cu: email },
      tokenObj: { access_token: password },
      profileObj: { imageUrl: image },
    } = response;
    if (type === "signup") {
      setUserData({
        next: true,
        name: username,
        email: email,
        password: password,
        image: image,
      });
    } else {
      console.log("we", email, password);
      dispatch(userLogin({ username: email, password }))
    }
  };

  return (
    <div className="flex items-center justify-center mt-4">
      <GoogleLogin
        clientId="502311807627-emfijnj80jj7t6qvqjlfu0jagndimeej.apps.googleusercontent.com"
        buttonText={
          type === "login" ? "Login with Google" : "Signup with Google"
        }
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
        render={(renderProps) => (
          <button
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            className="hover:scale-105 ease-in-out duration-300 shadow-lg p-2 rounded-lg m-1"
          >
            <img
              className="max-w-[25px]"
              src="https://ucarecdn.com/8f25a2ba-bdcf-4ff1-b596-088f330416ef/"
              alt="Google"
            />
          </button>
        )}
      />
    </div>
  );
};

export default GoogleAuth;
