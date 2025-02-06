import { useDispatch, useSelector } from "react-redux"
import { setUser, logout } from "../context/user/slice"
import { IUserStore } from "../types"
import { useQueryClient } from "@tanstack/react-query"

interface IUserActions {
  user: IUserStore | null
}

export const useUserActions = () => {
  const dispatch = useDispatch()
  const queryClient = useQueryClient()
  const user = useSelector((state: { user: IUserActions }) => state.user.user)

  const addUser = (newUser: IUserStore) => {
    dispatch(setUser(newUser))
  }

  const removeUser = async () => {
    await queryClient.removeQueries({ queryKey: ['user'] })
    dispatch(logout())
  }

  return { user, addUser, removeUser }
}

