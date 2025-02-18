import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./taskCalendar/sliceTask"
export const taskStore = configureStore({
  reducer:{
    task:taskReducer
  }
})