import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IBoardState, IBoardWithId, ICreateBoard, Id } from "../../types";
import { BoardStatus } from "../../type";


const initialState: IBoardState = [
  {
    id: "1",
    status: BoardStatus.IN_PROGRESS,
    title: "Test",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo eligendi nam illum cumque totam ipsa quae velit illo laudantium explicabo, sed cupiditate, harum nemo vero quibusdam non saepe labore. Facilis?Possimus, vel. Voluptatum accusamus at numquam sunt dicta itaque incidunt, laboriosam aliquid. Illo voluptatibus facilis dignissimos doloremque, amet cupiditate fugit alias iure voluptates ex earum? Delectus reprehenderit atque consequatur aut.",
    owner: "xjf_255",
    date: 1740766654631,
    users: [
      "lupe"
    ],
    likes: ["dsds"],
    comments: [
      {
        commentId: "1",
        date: 1740767068769,
        users: {
          user: "lupe",
          avatar: "https://res.cloudinary.com/dkshw9hik/image/upload/v1736294033/avatardefault_w9hsxz.webp"
        },
        comment: "No pongas ni mierda entonces",
      },
      {
        commentId: "2",
        date: 1740773774906,
        users: {
          user: "lupe",
          avatar: "https://res.cloudinary.com/dkshw9hik/image/upload/v1736294033/avatardefault_w9hsxz.webp"
        },
        comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo eligendi nam illum cumque totam ipsa quae velit illo laudantium explicabo, sed cupiditate, harum nemo vero quibusdam non saepe labore. Facilis?Possimus, vel. Voluptatum accusamus at numquam sunt dicta itaque incidunt, laboriosam aliquid. Illo voluptatibus facilis dignissimos doloremque, amet cupiditate fugit alias iure voluptates ex earum? Delectus reprehenderit atque consequatur aut.",
      }
    ]
  },
  {
    id: "2",
    status: BoardStatus.DONE,
    title: "Test",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo eligendi nam illum cumque totam ipsa quae velit illo laudantium explicabo, sed cupiditate, harum nemo vero quibusdam non saepe labore. Facilis?Possimus, vel. Voluptatum accusamus at numquam sunt dicta itaque incidunt, laboriosam aliquid. Illo voluptatibus facilis dignissimos doloremque, amet cupiditate fugit alias iure voluptates ex earum? Delectus reprehenderit atque consequatur aut.",
    owner: "xjf_255",
    date: 1740766654631,
    users: [
      "lupe"
    ],
    likes: ["dsds"],
    comments: [
      {
        commentId: "1",
        date: 1740767068769,
        users: {
          user: "lupe",
          avatar: "https://res.cloudinary.com/dkshw9hik/image/upload/v1736294033/avatardefault_w9hsxz.webp"
        },
        comment: "No pongas ni mierda entonces",
      },
      {
        commentId: "2",
        date: 1740773774906,
        users: {
          user: "lupe",
          avatar: "https://res.cloudinary.com/dkshw9hik/image/upload/v1736294033/avatardefault_w9hsxz.webp"
        },
        comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo eligendi nam illum cumque totam ipsa quae velit illo laudantium explicabo, sed cupiditate, harum nemo vero quibusdam non saepe labore. Facilis?Possimus, vel. Voluptatum accusamus at numquam sunt dicta itaque incidunt, laboriosam aliquid. Illo voluptatibus facilis dignissimos doloremque, amet cupiditate fugit alias iure voluptates ex earum? Delectus reprehenderit atque consequatur aut.",
      }
    ]
  }
]

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
