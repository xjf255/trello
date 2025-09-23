import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IPeopleState } from "../../types"
import { friendlyAPI } from "./friendlyAPI"
import { useUserActions } from "../../hooks/useUserActions"

// First, create the thunk
const fetchFriendships = createAsyncThunk(
  'friendships/fetchById/friends',
  async () => {
    const { user } = useUserActions()
    const response = await friendlyAPI.fetchFriendships(user.id)
    console.log(response)
    return response.data
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

const peopleSlice = createSlice({
  name: "people",
  initialState,
  reducers: {
    // addPerson: (state, action: PayloadAction<Omit<IPeopleState, 'id'>>) => {
    //   const id = crypto.randomUUID()
    //   state.push({ id, ...action.payload })
    // },
    // removePerson: (state, action: PayloadAction<string>) => {
    //   return state.filter(person => person.id !== action.payload)
    // },
    // updatePerson: (state, action: PayloadAction<IPeopleState>) => {
    //   const personId = state.findIndex(person => person.id === action.payload.id)
    //   if (personId !== -1) {
    //     state.splice(personId, 1, action.payload)
    //   }
    // }
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchFriendships.fulfilled, (state, action) => {
      // Add user to the state array
      state.friendships.push(action.payload)
    })
  }
})

export default peopleSlice.reducer
// export const { addPerson, removePerson, updatePerson } = peopleSlice.actions