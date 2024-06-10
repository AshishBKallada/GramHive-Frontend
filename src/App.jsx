import React, { useContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
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
import { NotificationState } from "./Context/notificationProvider";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import GoogleBot from "./Components/User/ChatBot/GoogleBot";
import TransactionsPage from "./pages/Admin/transcations";
import SocketToast from "./SocketToast";
import MtAlert from "./Components/User/Alert/MtAlert";
import { useToast } from "@chakra-ui/react";
const ENDPOINT = "http://localhost:3000";

function App() {
  const { token, loading } = useContext(AuthContext);
  // const [socket, setSocket] = useState(null);
  const { adminToken, setAdminToken, adminLoading, setAdminLoading } =
    useContext(AdminAuthContext);

  if (loading) {
    return <LoadingSpinner />;
  }

  const userId = useSelector((state) => state.user.user._id);
  const { addNotification } = NotificationState();
  const [socket, setSocket] = useState(null);
  var message;
  const toast = useToast();

  useEffect(() => {
    const socket = io("http://localhost:3000");

    socket.on("connect", () => {
      console.log("User connected to socket");
      socket.emit("setup", userId);
    });

    socket.on("abcd", (data) => {
      const { notification } = data;
      message = notification.message;
      toast({
        title: message,
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top",
       
      });
      
      
      addNotification(notification);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, addNotification]);

  return (
    <div>
      <SocketToast />
      <Router>
        <Routes>
          <Route
            path="/signup"
            element={token ? <Navigate to={"/"} /> : <UserSignup />}
          />
          <Route
            path="/"
            element={token ? <Home /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/login"
            element={token ? <Navigate to={"/"} /> : <Login />}
          />
          <Route
            path="/profile"
            element={token ? <UserProfile /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/editprofile"
            element={token ? <EditUserProfile /> : <Navigate to="/login" />}
          />
          <Route
            path="/userprofile/:userId"
            element={token ? <OtherUserProfile /> : <Navigate to="/login" />}
          />
          <Route path="/messages" element={<Messages />} />
          <Route path="/stories" element={<Story />} />
          <Route path="/live" element={<Live />} />
          <Route path="/promotions" element={<Promotions />} />
          <Route path="/nearbyusers" element={<NearbyUsers />} />

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

          <Route path="*" element={<Navigate to="/login" />} />


          <Route path="/room/:roomId" element={<RoomPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;