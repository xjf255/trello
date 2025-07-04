import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IUserStore, UserState } from "../../types";

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUserStore>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export default userSlice.reducer;
export const { setUser, logout } = userSlice.actions;
