import { useEffect, useState } from "react"
import { PATHS } from "../../utils/constant"
import { useNavigate } from "react-router-dom"
import { useUserActions } from "../../hooks/useUserActions"
import ModalCloseSession from "../../components/ModalCloseSession"

export default function Header() {
  const navigate = useNavigate()
  const { user } = useUserActions()
  const [redirecting, setRedirecting] = useState(false)

  useEffect(() => {
    if (!user && !redirecting) {
      setRedirecting(true)
      navigate(PATHS.verification.login)
    }
  }, [user, navigate, redirecting])

  if (!user) return <h1>Redirigiendo...</h1>
  return (
    <header className="master__header">
      {<h1>Welcome, {user?.user || "Guest"} 👋</h1>}
      <span>
        <ModalCloseSession />
      </span>
    </header>
  )
}