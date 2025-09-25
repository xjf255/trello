import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { IPeopleState } from "../../types"
import { useGetFriendshipsQuery } from "./friendlyAPI"

export const fetchFriendships = createAsyncThunk(
  'friendships/fetchById',
  async (userId: string) => {
    const response = await useGetFriendshipsQuery(userId)
    console.log(response)
    return Array.isArray(response.data) ? response.data : [response.data]
  },
)

interface IFriendshipsState {
  friendships: IPeopleState[]
  friendshipRequest: string[]
}

const initialState: IFriendshipsState = {
  friendships: [],
  friendshipRequest: []
}

const friendshipSlice = createSlice({
  name: "people",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchFriendships.fulfilled, (state, action) => {
      // Add user to the state array
      if (action.payload !== undefined) {
        state.friendships = (action.payload as IPeopleState[]).filter((item): item is IPeopleState => item !== undefined)
      }
    })
  }
})

export default friendshipSlice.reducer