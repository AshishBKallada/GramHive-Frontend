import React, { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserProfile from "../UserProfile/userprofile";
import Search from "../Search/Search";

function UserTable() {
  const [userData, setUserData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://bassheads.shop/admin/users", {
        credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUserData(data);
        setFilteredData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e) => {
    const filter = e.target.value;
    const filteredUsers = userData.filter(
      (user) =>
        user.username.toLowerCase().includes(filter.toLowerCase()) ||
        user.email.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredData(filteredUsers);
  };

  const handleViewProfile = (user) => {
    setSelectedUser(user);
   
  };

  const handleBanUser = async (user) => {
    const action = user.isBan ? "unban" : "ban";
    confirmAlert({
      title: `Confirm to ${action}`,
      message: `Are you sure you want to ${action} ${user.username}?`,
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              const response = await fetch(
                `https://bassheads.shop/admin/blockuser/${user._id}`
              );
              if (response.ok) {
                const status = await response.json();
                toast.success(`${user.username} has been ${status.status}.`);
                const updatedUserData = userData.map((u) => {
                  if (u._id === user._id) {
                    return { ...u, isBan: !user.isBan };
                  }
                  return u;
                });
                setUserData(updatedUserData);
                setFilteredData(updatedUserData);
              } else {
                toast.error(`Failed to ban ${user.username}.`);
              }
            } catch (error) {
              toast.error(`Failed to ban ${user.username}.`);
            }
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  return (
    <div className="relative min-h-screen bg-black text-gray-500">
      <div style={{marginLeft:'300px'}} className="fixed top-0 left-0 right-0 z-50 bg-gray-900 p-4 flex justify-between items-center">
        <h1 className="text-4xl font-bold text-gray-200 ml-4">Users</h1>
        <ToastContainer position="top-center" autoClose={1500} />
        <div className="mr-4">
          <Search handleSearch={handleSearch} />
        </div>
      </div>
      <div className="pt-20 px-3 py-4 flex justify-center mt-6">
        <div className="w-full">
          <div className="overflow-y-auto max-h-[calc(100vh-5rem)]">
            <table className="w-full text-md bg-gray-900 shadow-md rounded mb-4">
              <thead className="sticky top-0 bg-gray-800">
                <tr className="border-b">
                  <th className="text-left p-6 px-5">Username</th>
                  <th className="text-left p-3 px-5">Account name</th>
                  <th className="text-left p-3 px-5">Email</th>
                  <th className="text-left p-3 px-5">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((user, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-800 hover:bg-gray-950 hover:text-white bg-gray-900"
                  >
                    <td className="p-4 flex gap-5">
                      <img
                        className="w-12 h-12 rounded-full"
                        src={user.image}
                        alt=""
                      />
                      {user.username}
                    </td>
                    <td className="p-3 px-5">{user.name}</td>
                    <td className="p-3 px-5">
                      {user.email}
                      {user.isBan && <sup className="text-red-500">banned</sup>}
                    </td>
                    <td className="p-3 px-5 flex">
                      <button
                        type="button"
                        onClick={() => handleViewProfile(user)}
                        className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                      >
                        View
                      </button>
                      <button
                        type="button"
                        onClick={() => handleBanUser(user)}
                        className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                      >
                        {user.isBan ? "Unban" : "Ban"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {selectedUser && (
          <UserProfile setSelectedUser={setSelectedUser} user={selectedUser} />
      
      )}
    </div>
  );
}

export default UserTable;
