import { useDispatch } from "react-redux"
import { setUser } from "../context/user/slice"
import { IUserStore } from "../types"

export const useUserActions = () => {
  const dispatch = useDispatch()

  const addUser = (newUser: IUserStore) => {
    dispatch(setUser(newUser))
  }

  return { addUser }
}