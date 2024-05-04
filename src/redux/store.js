import { combineReducers } from "redux";
import adminAuthSlice from "./adminAuthSlice";
import userAuthSlice from "./userAuthSlice";
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const rootReducer = combineReducers({
    admin: adminAuthSlice,
    user:userAuthSlice
});

const persistConfig = {
    key: "root",
    storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer
});

export default store;
