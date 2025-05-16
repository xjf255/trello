export interface IUsers {
  id: string
  user: string
  email: string
  phone: string
  createdAt: Date
  updatedAt: Date
  isActive: boolean
  password?: string
  avatar: string | File
}
interface ModalContextType {
  isOpen: boolean
  changeModalState: () => void
}
export interface IUserStore extends IUsers {
  exp?: number
  iat?: number
}

export type IUser = Pick<IUsers, 'user' | 'password'>
export type IUserSignUp = Pick<IUsers, 'user' | 'password' | 'email', 'phone'>
export type IUpdateUser = Omit<IUsers, "createdAt" | "id" | "updatedAt">

interface dateOfTask {
  day: number
  month: number
  year: number
}

interface IDate extends dateOfTask {
  daysOfMonth: number
  startsOn: number
}

export type Id = string

export interface Task extends dateOfTask {
  taskTitle: string,
  taskDescription: string
  color: string
}

export interface TaskState extends Task {
  id: Id
}

interface IStateActions {
  task: TaskState[] | null
  user: IUserStore
  board: IBoardWithId[] | null
}

export interface IComment {
  commentId: string
  date: number
  users: Pick<IUsers, "user" | "avatar">
  comment: string
}

export type ICreateComment = Omit<IComment, "commentId">

export interface ICreateBoard {
  title: string
  description: string
  owner: string
  date: number
  users: string[]
}
export interface IBoard extends ICreateBoard {
  likes: Id[]
  comments: IComment[]
}

export interface IBoardWithId extends IBoard {
  id: Id
  status: BoardStatus
}

export type TaskId = string

export type IBoardState = IBoardWithId[]

interface ItemStatusBoard {
  value: BoardStatus | null
  label: string
  icon: React.FC | null
}

export interface Plans {
  plans: IPlans[]
} 
interface IPlans {
  name: string
  price: number
  features: string[]
}