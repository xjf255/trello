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

