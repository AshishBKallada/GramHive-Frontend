import React, { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserProfile from '../UserProfile/userprofile';
import Search from '../Search/Search';

function UserTable() {
  const [userData, setUserData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [userProfile, setUserProfile] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('before fetch');
        const response = await fetch('http://localhost:3000/admin/users',{
          credentials: 'include', 
        });
        if (!response.ok) {
          console.log('ooombi poyi');
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Data', data);
        setUserData(data);
        setFilteredData(data); 
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e) => {
    const filter = e.target.value;
    const filteredUsers = userData.filter((user) =>
      user.username.toLowerCase().includes(filter.toLowerCase()) ||
      user.email.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredData(filteredUsers);
  };

  const handleViewProfile = (user) => {
    setSelectedUser(user);
    setUserProfile(true);
  };

  const handleBanUser = async (user) => {
    const action = user.isBan ? 'unban' : 'ban';
    confirmAlert({
      title: `Confirm to ${action}`,
      message: `Are you sure you want to ${action} ${user.username}?`,
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              const response = await fetch(`http://localhost:3000/admin/blockuser/${user._id}`);
              if (response.ok) {
                const status = await response.json();
                console.log('kkkkkkkkk', status);
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
          label: 'No',
          onClick: () => { },
        },
      ],
    });
  };

  return (
    <div>
      <div className="text-gray-900 bg-gray-200">
        <div className="p-4 flex">
          <h1 className="text-3xl">Users</h1>
          <ToastContainer position="top-center" autoClose={1500} />
          <div style={{ marginLeft: '600px' }}>
            <Search handleSearch={handleSearch} />
          </div>
        </div>
        <div className="px-3 py-4 flex justify-center">
          <table className="w-full text-md bg-white shadow-md rounded mb-4">
            <tbody>
              <tr className="border-b">
                <th className="text-left p-3 px-5">Username</th>
                <th className="text-left p-3 px-5">Account name</th>
                <th className="text-left p-3 px-5">email</th>
                <th className="text-left p-3 px-5">Actions</th>
              </tr>
              {filteredData.map((user, index) => (
                <tr key={index} className="border-b hover:bg-orange-100 bg-gray-100">
                  <td className="p-3 px-5">{user.username}</td>
                  <td className="p-3 px-5">{user.name}</td>
                  <td className="p-3 px-5">
                    {user.email}
                    {user.isBan && <sup className="text-red-500">banned</sup>}
                  </td>

                  <td className="p-3 px-5 flex">
                    <button type="button" onClick={() => handleViewProfile(user)} className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">
                      view
                    </button>
                    <button type="button" onClick={() => handleBanUser(user)} className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">
                      {user.isBan ? 'Unban' : 'Ban'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {userProfile && (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-900 bg-opacity-75 flex justify-center items-center z-50">
          <button onClick={() => setUserProfile(false)} className="absolute top-4 right-4 text-white hover:text-gray-300 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <UserProfile user={selectedUser} />
        </div>
      )}
    </div>
  );
}

export default UserTable;
