import { useDispatch, useSelector } from "react-redux"
import { IStateActions } from "../types"

export const usePeopleActions = () => {
  const people = useSelector((state: IStateActions) => state.people)
  const dispatch = useDispatch()

  const addPerson = async (newPerson: { email: string }) => {
    const response = await fetch('http://localhost:1234/users/' + newPerson.email)
    if (!response.ok) throw new Error("Usuario no encontrado")

    const userData = await response.json()

    dispatch({ type: 'people/addPerson', payload: { ...userData } })
  }

  const removePerson = (id: string) => {
    dispatch({ type: 'people/removePerson', payload: id })
  }

  const updatePerson = (updatedPerson: IStateActions['people']) => {
    dispatch({ type: 'people/updatePerson', payload: updatedPerson })
  }

  const filterPeople = (query: string) => {
    return people?.filter(person => person.user.toLowerCase().includes(query.toLowerCase())) ?? null
  }

  return { people, addPerson, removePerson, updatePerson, filterPeople }
}