import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import AdminHome from './pages/Admin/Home';
import AdminLogin from './pages/Admin/Login';
import Users from './pages/Admin/Users';
import UserProfile from './pages/User/Profile';
import EditUserProfile from './pages/Admin/EditProfile';
import { AuthContext } from './Context/AuthContext';
import { AdminAuthContext } from './Context/AdminAuthContext';
import OtherUserProfile from './pages/User/OtherUserProfile';
import Home from './pages/User/Home';
import { Story } from './pages/User/Stories';
import Messages from './pages/User/Messages';
import RoomPage from './pages/User/Call';
import Login from './pages/User/Login';
import UserSignup from './pages/User/Signup';
import LoadingSpinner from './Components/External/LoadingSpinner';
import SidebarTest from './Components/Test/SidebarTest';
import NearbyUsersMap from './Components/Test/NearbyUsers';

function App() {
  const { token, loading } = useContext(AuthContext);
  const { adminToken, setAdminToken, adminLoading, setAdminLoading } = useContext(AdminAuthContext);

  if(loading) {
    return <LoadingSpinner/>
  }

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/signup" element={token ? <Navigate to={'/'}/> : <UserSignup />} />
          <Route path="/" element={token ? <Home /> : <Navigate to={'/login'}/>} />
          <Route path="/login" element={token ? <Navigate to={'/'} /> : <Login />} />
          <Route path="/profile" element={token ? <UserProfile /> : <Navigate to={'/login'} />} />
          <Route path="/editprofile" element={token ? <EditUserProfile /> : <Navigate to="/login" />} />
          <Route path="/userprofile/:userId" element={token ? <OtherUserProfile /> : <Navigate to="/login" />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/stories" element={<Story />} />


          <Route path="/admin" element={adminToken ? <Navigate to="/admin/home" /> : <AdminLogin />} />
          <Route path="/admin/home" element={adminToken ? <AdminHome /> : <AdminLogin />} />
          <Route path="/admin/users" element={adminToken ? <Users /> : <AdminLogin />} />
          <Route path="*" element={<Navigate to="/login" />} />

            <Route path = '/test' element={<NearbyUsersMap />} />
          <Route path="/room/:roomId" element={<RoomPage />}/>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
