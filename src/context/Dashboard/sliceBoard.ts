import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IBoardState, IBoardWithId, ICreateBoard, Id } from "../../types";


const initialState: IBoardState = [{
  id: "1",
  title: "Test",
  description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo eligendi nam illum cumque totam ipsa quae velit illo laudantium explicabo, sed cupiditate, harum nemo vero quibusdam non saepe labore. Facilis?Possimus, vel. Voluptatum accusamus at numquam sunt dicta itaque incidunt, laboriosam aliquid. Illo voluptatibus facilis dignissimos doloremque, amet cupiditate fugit alias iure voluptates ex earum? Delectus reprehenderit atque consequatur aut.",
  owner: "yo xd",
  date: 1740766654631,
  users: [
    "lupe"
  ],
  likes: ["dsds"],
  comments: [
    {
      commentId: "1",
      date: 1740767068769,
      users: "lupe",
      comment: "No pongas ni mierda entonces",
    },
    {
      commentId: "2",
      date: 1740773774906,
      users: "lupe",
      comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo eligendi nam illum cumque totam ipsa quae velit illo laudantium explicabo, sed cupiditate, harum nemo vero quibusdam non saepe labore. Facilis?Possimus, vel. Voluptatum accusamus at numquam sunt dicta itaque incidunt, laboriosam aliquid. Illo voluptatibus facilis dignissimos doloremque, amet cupiditate fugit alias iure voluptates ex earum? Delectus reprehenderit atque consequatur aut.",
    }
  ]
}]

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    createBoard: (state, action: PayloadAction<ICreateBoard>) => {
      const id = crypto.randomUUID()
      state.push({ id, ...action.payload, likes: [], comments: [] })
    },
    removeBoard: (state, action: PayloadAction<Id>) => {
      return state.filter(Board => Board.id !== action.payload)
    },
    updateBoard: (state, action: PayloadAction<IBoardWithId>) => {
      const BoardId = state.findIndex(Board => Board.id === action.payload.id)
      if (BoardId !== -1) {
        state[BoardId] = action.payload
      }
    }
  },
});

export default dashboardSlice.reducer;
export const { createBoard, removeBoard, updateBoard } = dashboardSlice.actions;
