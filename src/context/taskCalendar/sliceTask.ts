import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Task, TaskId, TaskState } from "../../types";


const initialState: TaskState[] = [{
  id: "1",
  day: 18,
  month: 1,
  year: 2025,
  taskTitle: "Test",
  color: "#434343",
  taskDescription: "state testing"
}]

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    createTask: (state, action: PayloadAction<Task>) => {
      const id = crypto.randomUUID()
      state.push({ id, ...action.payload })
    },
    removeTask: (state, action: PayloadAction<TaskId>) => {
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
