import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IBoardState, IBoardWithId, ICreateBoard, Id } from "../../types";
import { BoardStatus } from "../../type";


const initialState: IBoardState = (() => {
  try {
    const persisted = localStorage.getItem("trello_boards")
    return persisted ? JSON.parse(persisted) : []
  } catch (error) {
    console.error("Failed to load boards from localStorage:", error)
    return []
  }
})()


const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    createBoard: (state, action: PayloadAction<ICreateBoard>) => {
      const id = crypto.randomUUID()
      state.push({ id, status: BoardStatus.IN_PROGRESS, ...action.payload, likes: [], comments: [] })
    },
    removeBoard: (state, action: PayloadAction<Id>) => {
      return state.filter(Board => Board.id !== action.payload)
    },
    updateBoard: (state, action: PayloadAction<IBoardWithId>) => {
      const BoardId = state.findIndex(Board => Board.id === action.payload.id)
      if (BoardId !== -1) {
        state.splice(BoardId, 1, action.payload)
      }
    }
  },
});

export default dashboardSlice.reducer;
export const { createBoard, removeBoard, updateBoard} = dashboardSlice.actions;
