import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import store from "./redux/store.js";
import { AuthProvider } from "./Context/AuthContext.jsx";
import { AdminAuthProvider } from "./Context/AdminAuthContext.jsx";
import { LoadingProvider } from "./Context/LoadingContext.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import ChatProvider from "./Context/ChatProvider.jsx";
const persistor = persistStore(store);
import { GoogleOAuthProvider } from "@react-oauth/google";
import { LocationProvider } from "./Context/LocationContext.jsx";
import { SocketProvider } from "./Context/socketContext.jsx";
import NotificationProvider from "./Context/notificationProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <SocketProvider>
  <NotificationProvider>
    <ChakraProvider>
      <GoogleOAuthProvider clientId="<your_client_id>">
        <LocationProvider>
          <AdminAuthProvider>
            <AuthProvider>
              <LoadingProvider>
                <ChatProvider>
                  <Provider store={store}>
                    <PersistGate persistor={persistor}>
                      <App />
                    </PersistGate>
                  </Provider>
                </ChatProvider>
              </LoadingProvider>
            </AuthProvider>
          </AdminAuthProvider>
        </LocationProvider>
      </GoogleOAuthProvider>
    </ChakraProvider>
    </NotificationProvider>
  // </SocketProvider>
);
