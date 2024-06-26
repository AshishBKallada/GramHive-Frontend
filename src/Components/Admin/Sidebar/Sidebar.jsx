import React, { useContext, useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUser } from "react-icons/ai";
import { FiMessageSquare, FiFolder } from "react-icons/fi";
import { FiLogOut } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { AdminAuthContext } from "../../../Context/AdminAuthContext";
import Cookies from "js-cookie";
import { useToast } from "@chakra-ui/react";
import AdminLogoutLoading from "../../Loading/AdminLogoutLoading";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [reportsOpen, setReportsOpen] = useState(false);
  const { setAdminToken } = useContext(AdminAuthContext);
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const menus = [
    { name: "Dashboard", link: "/admin/home", icon: MdOutlineDashboard },
    { name: "Users", link: "/admin/users", icon: AiOutlineUser },
    { name: "Reports", link: "/", icon: FiMessageSquare, isDropdown: true },
    {
      name: "Transactions",
      link: "/admin/transactions",
      icon: TbReportAnalytics,
      margin: true,
    },
    { name: "Feedbacks", link: "/admin/feedbacks", icon: FiFolder },
  ];

  const reportSubLinks = [
    { name: "User Reports", link: "/admin/userreports" },
    { name: "Post Reports", link: "/admin/postreports" },
  ];

  const handleLogout = async () => {
    setLoading(true);
    Cookies.remove("adminToken");
    setTimeout(() => {
      setLoading(false);
      setAdminToken(null);
      toast({
        description: "Logged Out!",
        status: "success",
        position: "top",
        duration: 3000,
        isClosable: true,
      });
    }, 3000); 
  };

  return (
    <section className="flex gap-6">
      {loading && <AdminLogoutLoading />}
      <div
        className={`bg-gray-900 min-h-screen ${
          open ? "w-72" : "w-16"
        } duration-500 text-gray-100 px-4 flex flex-col justify-between`}
      >
        <div>
          <div className="py-3 flex justify-end">
            <HiMenuAlt3
              size={26}
              className="cursor-pointer"
              onClick={() => setOpen(!open)}
            />
          </div>
          <div className="mt-4 flex flex-col gap-4 relative">
            {open ? (
              <h1 className="hidden md:block font-bold text-sm md:text-xl text-center">
                <img
                  className="ml-6 mb-6"
                  src="https://fontmeme.com/permalink/240528/22b9675bf28cd25f7e478893edac5ea4.png"
                  alt="Logo"
                />
              </h1>
            ) : (
              <h1 className="font-bold text-4xl text-center md:hidden">G</h1>
            )}
            {menus.map((menu, i) => (
              <div key={i} className={`${menu.margin && "mt-5"} relative`}>
                {menu.isDropdown ? (
                  <>
                    <div
                      className={`group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md cursor-pointer`}
                      onClick={() => setReportsOpen(!reportsOpen)}
                    >
                      <div>
                        {React.createElement(menu.icon, { size: "20" })}
                      </div>
                      <h2
                        style={{
                          transitionDelay: `${i + 3}00ms`,
                        }}
                        className={`whitespace-pre duration-500 ${
                          !open && "opacity-0 translate-x-28 overflow-hidden"
                        }`}
                      >
                        {menu.name}
                      </h2>
                      <h2
                        className={`${
                          open && "hidden"
                        } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
                      >
                        {menu.name}
                      </h2>
                    </div>
                    {reportsOpen && (
                      <div className={`ml-4 mt-2 ${!open && "ml-8"}`}>
                        {reportSubLinks.map((subLink, j) => (
                          <Link
                            to={subLink.link}
                            key={j}
                            className="flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md"
                          >
                            <span className="ml-4">{subLink.name}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={menu.link}
                    className={`group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
                  >
                    <div>{React.createElement(menu.icon, { size: "20" })}</div>
                    <h2
                      style={{
                        transitionDelay: `${i + 3}00ms`,
                      }}
                      className={`whitespace-pre duration-500 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      {menu.name}
                    </h2>
                    <h2
                      className={`${
                        open && "hidden"
                      } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
                    >
                      {menu.name}
                    </h2>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <div
            onClick={handleLogout}
            className="group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md cursor-pointer"
          >
            <div>
              {React.createElement(FiLogOut, { size: "20", color: "red" })}
            </div>
            <h2
              style={{
                transitionDelay: `${menus.length + 3}00ms`,
              }}
              className={`whitespace-pre duration-500 ${
                !open && "opacity-0 translate-x-28 overflow-hidden"
              }`}
            >
              Logout
            </h2>
            <h2
              className={`${
                open && "hidden"
              } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
            >
              L
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
