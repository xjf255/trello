import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./user/slice"
import taskReducer from "./taskCalendar/sliceTask"
import boardReducer from "./Dashboard/sliceBoard"
import { friendlyAPI } from "./people/friendlyAPI"

export const store = configureStore({
  reducer: {
    user: userReducer,
    task: taskReducer,
    board: boardReducer,
    [friendlyAPI.reducerPath]: friendlyAPI.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(friendlyAPI.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch