import { createSlice, PayloadAction } from "@reduxjs/toolkit"
interface dateOfTask {
  day: number,
  month: number,
  year: number
}

type TaskId = string

interface Task {
  date: dateOfTask,
  taskTitle: string,
  taskDescription: string
}

interface TaskState extends Task {
  id: TaskId
}

const initialState: TaskState[] = [{
  id: "1",
  date: {
    day: 18,
    month: 1,
    year: 2025
  },
  taskTitle: "Test",
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
      if (taskId !== -1){
        state[taskId] = action.payload
      }
    }
  },
});

export default taskSlice.reducer;
export const { createTask, removeTask, updateTask } = taskSlice.actions;
