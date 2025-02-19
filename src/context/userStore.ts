import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./user/slice"
import taskReducer from "./taskCalendar/sliceTask"

export const userStore = configureStore({
  reducer: {
    user: userReducer,
    task:taskReducer
  },
})