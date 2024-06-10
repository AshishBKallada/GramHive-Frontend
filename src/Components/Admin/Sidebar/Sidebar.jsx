import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUser } from "react-icons/ai";
import { FiMessageSquare, FiFolder } from "react-icons/fi";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [reportsOpen, setReportsOpen] = useState(false);

  const menus = [
    { name: "dashboard", link: "/admin/home", icon: MdOutlineDashboard },
    { name: "user", link: "/admin/users", icon: AiOutlineUser },
    { name: "Reports", link: "/", icon: FiMessageSquare, isDropdown: true },
    { name: "Transactions", link: "/admin/transactions", icon: TbReportAnalytics, margin: true },
    { name: "Feedbacks", link: "/admin/feedbacks", icon: FiFolder },
    { name: "Setting", link: "/", icon: RiSettings4Line },
  ];

  const reportSubLinks = [
    { name: "User Reports", link: "/admin/userreports" },
    { name: "Post Reports", link: "/admin/postreports" },
  ];

  return (
    <section className="flex gap-6">
      <div
        className={`bg-[#0e0e0e] min-h-screen ${
          open ? "w-72" : "w-16"
        } duration-500 text-gray-100 px-4`}
      >
        <div className="py-3 flex justify-end">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          <h1 className="font-bold text-4xl text-center md:hidden">
            D<span className="text-teal-600">.</span>
          </h1>
          <h1 className="hidden md:block font-bold text-sm md:text-xl text-center">
            <img
              className="ml-6 mb-6"
              src="https://fontmeme.com/permalink/240528/22b9675bf28cd25f7e478893edac5ea4.png"
              alt=""
            />
          </h1>
          {menus.map((menu, i) => (
            <div key={i} className={`${menu.margin && "mt-5"} relative`}>
              {menu.isDropdown ? (
                <>
                  <div
                    className={`group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md cursor-pointer`}
                    onClick={() => setReportsOpen(!reportsOpen)}
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
    </section>
  );
};

export default Sidebar;
