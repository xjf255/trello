import { Navigate, Outlet } from "react-router-dom";
import { PATHS } from "../utils/constant";
interface Props {
  isAuthenticated: boolean
}

export default function ProtectedRoutes({ isAuthenticated = false }: Props) {
  if (!isAuthenticated) return <Navigate to={PATHS.verification.login} replace />
  return <Outlet />
}