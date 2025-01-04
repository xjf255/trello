import { Outlet } from "react-router-dom"
import { NotAuthorized } from "./NotAuthorized"
interface Props {
  isAuthenticated: boolean
}

export default function ProtectedRoutes({ isAuthenticated = false }: Props) {
  if (!isAuthenticated) return <>
    <NotAuthorized />
  </>
  return <Outlet />
}