import { Navigate, useNavigate } from "react-router"
import { PATHS } from "../utils/constant"
import { useEffect, useState } from "react"

export function NotAuthorized() {
  const navigate = useNavigate()
  const [isRedirecting, setIsRedirecting] = useState(false)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsRedirecting(true)
      navigate(PATHS.verification.login)
    }, 3000)

    return () => clearTimeout(timeoutId)
  }, [navigate])
  if (isRedirecting) {
    return <Navigate to={PATHS.verification.login} replace />
  }

  return (
    <div>
      <h1>Loading...</h1>
    </div>
  )
}
