// store.js

import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; 
import authSliceReducer from "./slices/authSlice";
import columnSliceReducer from "./slices/columnsSlice";
import { persistStore } from "redux-persist";

const rootReducer = combineReducers({
  auth: authSliceReducer,
  columns: columnSliceReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
