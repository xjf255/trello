import { useDispatch, useSelector } from "react-redux"
import { IStateActions, Task, TaskId, TaskState } from "../types"
import { createTask, removeTask, updateTask } from "../context/taskCalendar/sliceTask"

export const useTaskActions = () => {
  const dispatch = useDispatch()
  const tasks = useSelector((state: IStateActions) => state.task)

  const create = (task: Task) => dispatch(createTask(task))
  const update = (task: TaskState) => dispatch(updateTask(task))
  const remove = (idTask: TaskId) => dispatch(removeTask(idTask))
  // ordenar las tareas
  const getTasks = (month: number, year: number) => tasks?.filter(task => task.month === month && task.year === year)
  return { tasks, create, update, remove, getTasks }
}