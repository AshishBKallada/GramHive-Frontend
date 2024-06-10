import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaSearch,
  FaCompass,
  FaRegPlayCircle,
  FaEnvelope,
  FaBell,
  FaPlusSquare,
  FaUserFriends,
  FaEllipsisH,
} from "react-icons/fa";
import "./Sidebar.css";
import CreatePost from "../CreatePost/CreatePost";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import SearchModal from "../../../../dummy";
import { AuthContext } from "../../../Context/AuthContext";
import Search from "../Search/Search";

const Sidebar = () => {
  const [create, setshowCreate] = useState(false);
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const { setToken } = useContext(AuthContext);
  const [showLogout, setShowLogout] = useState(false);

  const handleLogout = () => {
    confirmAlert({
      title: "Confirm to Logout",
      message: "Are you sure to logout.",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            Cookies.remove("token");
            setToken(null);
            navigate("/login");
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
    // alert()
    // setShowLogout(true);
  };
  return (
    <>
      <div className="sidebar">
        <div className="logo w-full">
          <img
            className="ml-6"
            src="https://fontmeme.com/permalink/240410/921064cd21a38f61c2f581450ded4de3.png"
            alt=""
          />
        </div>
        <ul className="sidebar-nav">
          <li>
            <Link to="/">
              <FaHome className="sidebar-icon" />
              Home
            </Link>
          </li>
          <li>
            <div className="ml-40">
              {showSearch && (
                <SearchModal
                  onClickOutside={() => setShowSearch((prev) => !prev)}
                  setShowSearch={setShowSearch}
                />
              )}
            </div>
            <Link onClick={() => setShowSearch((prev) => !prev)}>
              <FaSearch className="sidebar-icon" />
              Search
            </Link>
          </li>
          <li>
            <Link to="/explore">
              <FaCompass className="sidebar-icon" />
              Explore
            </Link>
          </li>
          <li>
            <Link to="/reel">
              <FaRegPlayCircle className="sidebar-icon" />
              Reel
            </Link>
          </li>
          <li>
            <Link to="/messages">
              <FaEnvelope className="sidebar-icon" />
              Messages
            </Link>
          </li>{" "}
          {showLogout && (
            <div
              className="fixed z-10 inset-0 overflow-y-auto"
              x-show="open"
              x-description="Background overlay"
              x-transition:enter="ease-out duration-300"
              x-transition:enter-start="opacity-0"
              x-transition:enter-end="opacity-100"
              x-transition:leave="ease-in duration-200"
              x-transition:leave-start="opacity-100"
              x-transition:leave-end="opacity-0"
            >
              <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div
                  className="fixed inset-0 transition-opacity"
                  aria-hidden="true"
                  x-description="Background overlay, show/hide based on modal state."
                  x-show="open"
                  x-transition:enter="ease-out duration-300"
                  x-transition:enter-start="opacity-0"
                  x-transition:enter-end="opacity-100"
                  x-transition:leave="ease-in duration-200"
                  x-transition:leave-start="opacity-100"
                  x-transition:leave-end="opacity-0"
                >
                  <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>

                <span
                  className="hidden sm:inline-block sm:align-middle sm:h-screen"
                  aria-hidden="true"
                >
                  &#8203;
                </span>

                <div
                  className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="modal-headline"
                  x-show="open"
                  x-transition:enter="ease-out duration-300"
                  x-transition:enter-start="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  x-transition:enter-end="opacity-100 translate-y-0 sm:scale-100"
                  x-transition:leave="ease-in duration-200"
                  x-transition:leave-start="opacity-100 translate-y-0 sm:scale-100"
                  x-transition:leave-end="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3
                        className="text-lg leading-6 font-medium text-gray-900"
                        id="modal-headline"
                      >
                        Sign out
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Are you sure you would like to sign out of your
                          account?
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Sign out
                    </button>
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          <li>
            <Link to="/notifications">
              <FaBell className="sidebar-icon" />
              Notifications
            </Link>
          </li>
          <li>
            <Link onClick={() => setshowCreate((prev) => !prev)}>
              <FaPlusSquare className="sidebar-icon" /> Create
            </Link>
          </li>
          <li>
            <Link to="/profile">
              <FaUserFriends className="sidebar-icon" />
              Profile
            </Link>
          </li>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <li>
            <Link to="/more">
              {/* <FaEllipsisH className="sidebar-icon" /> */}
              <button
                className="ml-8 select-none rounded-lg bg-gray-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                onClick={handleLogout}
              >
                Logout
              </button>
            </Link>
          </li>
        </ul>
      </div>
      {create && <CreatePost setshowCreate={setshowCreate} />}
      {showSearch && (
        <Search showSearch={showSearch} setShowSearch={setShowSearch} />
      )}
    </>
  );
};

export default Sidebar;
