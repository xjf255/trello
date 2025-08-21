import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IPeopleState } from "../../types"

const initialState: IPeopleState[] = [
  { id: "1", avatar: "https://res.cloudinary.com/dkshw9hik/image/upload/v1736294033/avatardefault_w9hsxz.webp", user: "John Doe", email: "admin@gmail.com", isActive: true },
  { id: "2", avatar: "", user: "Jane Smith", email: "", isActive: true },
  { id: "3", avatar: "", user: "Alice Johnson", email: "", isActive: true},
  { id: "4", avatar: "", user: "Bob Brown", email: "", isActive: true }
]

const peopleSlice = createSlice({
  name: "people",
  initialState,
  reducers: {
    addPerson: (state, action: PayloadAction<Omit<IPeopleState, 'id'>>) => {
      const id = crypto.randomUUID()
      state.push({ id, ...action.payload })
    },
    removePerson: (state, action: PayloadAction<string>) => {
      return state.filter(person => person.id !== action.payload)
    },
    updatePerson: (state, action: PayloadAction<IPeopleState>) => {
      const personId = state.findIndex(person => person.id === action.payload.id)
      if (personId !== -1) {
        state.splice(personId, 1, action.payload)
      }
    }
  }
})

export default peopleSlice.reducer
export const { addPerson, removePerson, updatePerson } = peopleSlice.actions