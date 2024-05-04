import { configureStore } from "@reduxjs/toolkit";
import columnsReducer from "./slices/columnsSlice";

export const store = configureStore({
  reducer: {
    columns: columnsReducer,
  },
});
