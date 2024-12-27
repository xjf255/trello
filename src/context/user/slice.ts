import { createSlice } from "@reduxjs/toolkit"

const userReducer = createSlice({
  name: 'user',
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    logout: (state) => {
      state.user = null
    },
    getUser: (state) => {
      if(!state.user) {
        console.error('User not logged in')
        return
      }
      return state.user
    },
  }
})

export default userReducer.reducer
export const { setUser, logout, getUser } = userReducer.actions