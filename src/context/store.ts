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

store.subscribe(() => {
  try {
    localStorage.setItem("trello_boards", JSON.stringify(store.getState().board))
  } catch (error) {
    console.error("Failed to save boards to localStorage:", error)
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch