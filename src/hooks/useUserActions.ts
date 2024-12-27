import { useDispatch } from "react-redux"
import { addRepositories, createNewUser, updateStateUser } from "../store/users/slice";

export const useUserActions = () => {
  const dispatch = useDispatch()

  const addUser = ({ newUser }) => {
    dispatch(createNewUser(newUser))
  }

  return { addUser }
}