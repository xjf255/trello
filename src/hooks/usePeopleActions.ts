import { useDispatch, useSelector } from "react-redux"
import { IStateActions } from "../types"

export const usePeopleActions = () => {
  const people = useSelector((state: IStateActions) => state.people)
  const dispatch = useDispatch()

  const addPerson = (newPerson: Omit<IStateActions['people'], 'id'>) => {
    const id = crypto.randomUUID()
    dispatch({ type: 'people/addPerson', payload: { id, ...newPerson } })
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

  return { people, addPerson, removePerson, updatePerson, filterPeople}
}