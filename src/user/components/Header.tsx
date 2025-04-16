import { useEffect, useState } from "react"
import { PATHS } from "../../utils/constant"
import { useLocation, useNavigate } from "react-router-dom"
import { useUserActions } from "../../hooks/useUserActions"
import { ReturnArrow } from "../../components/Icons"
import ModalCloseSession from "../../components/ModalCloseSession"

export default function Header() {
  const location = useLocation()
  const [isDashboard, setIsDashboard] = useState(true)
  const navigate = useNavigate()
  const { user } = useUserActions()
  const [redirecting, setRedirecting] = useState(false)

  useEffect(() => {
    if (!user && !redirecting) {
      console.log("Usuario no autenticado, redirigiendo...")
      setRedirecting(true)
      navigate(PATHS.verification.login)
    }
  }, [user, navigate, redirecting])

  useEffect(() => {
    console.log(location.pathname)
    if (location.pathname !== PATHS.user.workerspace.dashboard && isDashboard) return setIsDashboard(false)
    setIsDashboard(true)
  }, [location.pathname])

  const changePage = (URL: string) => {
    navigate(URL)
  }

  if (!user) return <h1>Redirigiendo...</h1>
  return (
    <header>
      {isDashboard ? <h1>Welcome, {user?.user || "Guest"}</h1> : <i onClick={() => changePage(PATHS.user.workerspace.dashboard)}><ReturnArrow /></i>}
      <span>
        <figure onClick={() => changePage(PATHS.user.settings)}>
          {user?.avatar && <img className="user__avatar" src={user.avatar as string} alt={user.user || "User"} />}
        </figure>
        <ModalCloseSession />
      </span>
    </header>
  )
}