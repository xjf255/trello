import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/slice";

export const userStore = configureStore({
  reducer: {
    user: userReducer,
  },
})