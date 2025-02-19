export interface IUsers {
  id: string
  user: string
  email: string,  
  phone: string
  createdAt: Date
  updatedAt: Date
  isActive: boolean
  password?: string
  avatar: string | File
}
export interface IUserStore extends IUsers {
  exp?: number
  iat?: number
}

export type IUser = Pick<IUsers, 'user' | 'password' >
export type IUserSignUp = Pick<IUsers, 'user' | 'password' | 'email', 'phone'>
export type IUpdateUser = Omit<IUsers,"createdAt" | "id"|"updatedAt">

interface dateOfTask {
  day: number,
  month: number,
  year: number
}

interface IDate extends dateOfTask{
  daysOfMonth: number,
  startsOn: number
}

export type TaskId = string

export interface Task extends dateOfTask {
  taskTitle: string,
  taskDescription: string
  color: string
}

export interface TaskState extends Task {
  id: TaskId
}

interface IStateActions {
  task: TaskState[] | null
  user: IUserStore | null
}