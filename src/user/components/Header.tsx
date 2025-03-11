import { useEffect, useState } from "react"
import { PATHS } from "../../utils/constant"
import { useLocation, useNavigate } from "react-router-dom"
import { useUserActions } from "../../hooks/useUserActions"
import { ReturnArrow } from "../../components/Icons"

export default function Header() {
  const location = useLocation()
  const [isDashboard, setIsDashboard] = useState(true)
  const navigate = useNavigate()
  const { user, removeUser } = useUserActions()
  const [redirecting, setRedirecting] = useState(false)

  useEffect(() => {
    if (!user && !redirecting) {
      console.log("Usuario no autenticado, redirigiendo...")
      setRedirecting(true)
      navigate(PATHS.verification.login)
    }
  }, [user, navigate, redirecting])

  useEffect(() => {
    if (location.pathname !== PATHS.user.workerspace.dashboard && isDashboard) return setIsDashboard(false)
    return setIsDashboard(true)
  }, [location.pathname])

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    try {
      const response = await fetch("http://localhost:1234/verification/logout", {
        method: "POST",
        credentials: "include",
      })

      if (response.ok) {
        console.log("Logout exitoso, removiendo usuario...")
        await removeUser()
      } else {
        console.error("Error en logout:", response.statusText)
      }
    } catch (error) {
      console.error("Error de red:", error)
    }
  }

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
        <button onClick={handleClick}>Log Out</button>
      </span>
    </header>
  )
}