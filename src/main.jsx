import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import store from './redux/store.js';
import { AuthProvider } from './Context/AuthContext.jsx';
import { AdminAuthProvider } from './Context/AdminAuthContext.jsx';
import { LoadingProvider } from './Context/LoadingContext.jsx';
const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById('root')).render(
    <AdminAuthProvider>
    <AuthProvider>
      <LoadingProvider>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
    </LoadingProvider>
    </AuthProvider>
    </AdminAuthProvider>
);
