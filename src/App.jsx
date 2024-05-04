import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './Components/User/Signup/Signup';
import Login from './Components/User/Login/Login';
import AdminHome from './pages/Admin/Home';
import AdminLogin from './pages/Admin/Login';
import Users from './pages/Admin/Users';
import UserProfile from './pages/User/Profile';
import EditUserProfile from './pages/Admin/EditProfile';
import { AuthContext } from './Context/AuthContext';
import { AdminAuthContext } from './Context/AdminAuthContext';
import OtherUserProfile from './pages/User/OtherUserProfile';
import Home from './pages/User/Home';


import S3VideoRecorder from './pages/User/Tester';
import { Story } from './pages/User/Stories';
import InstagramStoryViewer from './Components/Test/insta-storyCarosuel';
import UserChat from './pages/User/Messages';
import Messages from './pages/User/Messages';


function App() {
  const { token, loading } = useContext(AuthContext);
  const { adminToken, setAdminToken, adminLoading, setAdminLoading } = useContext(AdminAuthContext);
  console.log('00000000000000000000000', adminToken);
  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={token ? <Home /> : <Login />} />
          <Route path="/login" element={token ? <Navigate to="/" /> : <Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={token ? <UserProfile /> : <Navigate to="/login" />} />
          <Route path="/editprofile" element={token ? <EditUserProfile /> : <Navigate to="/login" />} />
          <Route path="/userprofile/:userId" element={token ? <OtherUserProfile /> : <Navigate to="/login" />} />


          <Route path="/admin" element={adminToken ? <Navigate to="/admin/home" /> : <AdminLogin />} />
          <Route path="/admin/home" element={adminToken ? <AdminHome /> : <AdminLogin />} />
          <Route path="/admin/users" element={adminToken ? <Users /> : <AdminLogin />} />
          <Route path="*" element={<Navigate to="/login" />} />
          <Route path="/messages" element={<Messages />} />

          <Route path="/stories" element={<Story />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
