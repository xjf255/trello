import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Id, Task, TaskState } from "../../types";

const initialState: TaskState[] = []

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    createTask: (state, action: PayloadAction<Task>) => {
      const id = crypto.randomUUID()
      state.push({ id, ...action.payload })
    },
    removeTask: (state, action: PayloadAction<Id>) => {
      return state.filter(task => task.id !== action.payload)
    },
    updateTask: (state, action: PayloadAction<TaskState>) => {
      const taskId = state.findIndex(task => task.id === action.payload.id)
      if (taskId !== -1) {
        state[taskId] = action.payload
      }
    }
  },
});

export default taskSlice.reducer;
export const { createTask, removeTask, updateTask } = taskSlice.actions;
