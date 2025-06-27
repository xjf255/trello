import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./user/slice"
import taskReducer from "./taskCalendar/sliceTask"
import boardReducer from "./Dashboard/sliceBoard"

export const userStore = configureStore({
  reducer: {
    user: userReducer,
    task:taskReducer,
    board: boardReducer,
  },
})