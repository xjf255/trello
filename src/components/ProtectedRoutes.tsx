import { Navigate, Outlet } from "react-router-dom";

interface Props {
  canActive: boolean,
  redirectedPath?: string
}

export default function ProtectedRoutes({ canActive, redirectedPath = '/' }: Props) {
  if (!canActive) return <Navigate to={redirectedPath} replace />

  return <Outlet />
}