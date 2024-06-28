import React, { useContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AdminHome from "./pages/Admin/Home";
import AdminLogin from "./pages/Admin/Login";
import Users from "./pages/Admin/Users";
import UserProfile from "./pages/User/Profile";
import EditUserProfile from "./pages/Admin/EditProfile";
import { AuthContext } from "./Context/AuthContext";
import { AdminAuthContext } from "./Context/AdminAuthContext";
import OtherUserProfile from "./pages/User/OtherUserProfile";
import Home from "./pages/User/Home";
import { Story } from "./pages/User/Stories";
import Messages from "./pages/User/Messages";
import RoomPage from "./pages/User/Call";
import Login from "./pages/User/Login";
import UserSignup from "./pages/User/Signup";
import LoadingSpinner from "./Components/External/LoadingSpinner";
import Live from "./pages/User/Live";
import Promotions from "./pages/User/Promotions";
import NearbyUsers from "./pages/User/NearbyUsers";
import Feedbacks from "./pages/Admin/Feedbacks";
import PostReportsPage from "./pages/Admin/PostReportsPage";
import UserReportsPage from "./pages/Admin/UserReportsPage";
import { NotificationContext } from "./Context/notificationProvider";
import { useSelector } from "react-redux";
import TransactionsPage from "./pages/Admin/Transactions";
import { useToast } from "@chakra-ui/react";
import ErrorPage from "./pages/User/ErrorPage";
import { SocketContext } from "./Context/socketContext";
import ResetPassword from "./Components/User/SignupTest/resetpassword";

function App() {
  const { token, loading } = useContext(AuthContext);
  const { adminToken, adminLoading } = useContext(AdminAuthContext);
  const user = useSelector((state) => state.user.user);
  const userId = user ? user._id : null;
  const { addNotification } = useContext(NotificationContext);
  const toast = useToast();
  const socket = useContext(SocketContext);

  useEffect(() => {
    if (!socket) return;

    const handleNotification = (data) => {
      const { notification } = data;
      toast({
        title: notification.message,
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
      addNotification(notification);
    };

    socket.on("abcd", handleNotification);

    return () => {
      socket.off("abcd", handleNotification);
    };
  }, [socket, addNotification, toast]);

  if (loading || adminLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/signup"
            element={token ? <Navigate to="/" /> : <UserSignup />}
          />
          <Route
            path="/"
            element={token ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={token ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/profile"
            element={token ? <UserProfile /> : <Navigate to="/login" />}
          />
          <Route
            path="/editprofile"
            element={token ? <EditUserProfile /> : <Navigate to="/login" />}
          />
          <Route
            path="/userprofile/:userId"
            element={token ? <OtherUserProfile /> : <Navigate to="/login" />}
          />
          <Route path="/messages" element={token ?<Messages />: <Navigate to="/login" />} />
          <Route path="/stories" element={token ?<Story />: <Navigate to="/login" />} />
          <Route path="/live" element={token ?<Live />: <Navigate to="/login" />} />
          <Route path="/promotions" element={token ?<Promotions />: <Navigate to="/login" />} />
          <Route path="/nearbyusers" element={token ?<NearbyUsers />: <Navigate to="/login" />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          <Route
            path="/admin"
            element={
              adminToken ? <Navigate to="/admin/home" /> : <AdminLogin />
            }
          />
          <Route
            path="/admin/home"
            element={adminToken ? <AdminHome /> : <AdminLogin />}
          />
          <Route
            path="/admin/users"
            element={adminToken ? <Users /> : <AdminLogin />}
          />
          <Route
            path="/admin/feedbacks"
            element={adminToken ? <Feedbacks /> : <AdminLogin />}
          />
          <Route
            path="/admin/postreports"
            element={adminToken ? <PostReportsPage /> : <AdminLogin />}
          />
          <Route
            path="/admin/userreports"
            element={adminToken ? <UserReportsPage /> : <AdminLogin />}
          />
          <Route
            path="/admin/transactions"
            element={adminToken ? <TransactionsPage /> : <AdminLogin />}
          />
          <Route path="*" element={<ErrorPage />} />
          <Route path="/room/:roomId" element={<RoomPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
