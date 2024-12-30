export interface IUserStore {
  createdAt: Date
  email: string
  exp?: number
  iat?: number
  id: string
  isActive: boolean
  updatedAt: Date
  user: string
}