import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

interface Props {
  redirectedPath?: string
}

export default function ProtectedRoutes({ redirectedPath = '/' }: Props) {
  const [isAuthenticated, setIsAuthenticated] = useState(true)
  useEffect(() => {
    const getInformation = async () => {
      const response = await fetch('http://localhost:1234/protected', { credentials: 'include' })
      if (!response.ok) {
        console.error('No tienes permisos para acceder a esta página')
        setIsAuthenticated(false)
        return
      }
      const data = await response.json()
      console.log('Información:', data)
    }
    getInformation()
  }, [])

  if (!isAuthenticated) return <Navigate to={redirectedPath} replace />
  return <Outlet />
}