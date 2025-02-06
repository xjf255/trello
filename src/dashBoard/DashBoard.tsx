import { useNavigate } from "react-router"
import { useEffect, useState } from "react"
import { PATHS } from "../utils/constant"
import { useUserActions } from "../hooks/useUserActions"

export default function DashBoard() {
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

  if (!user) return <h1>Redirigiendo...</h1> // ✅ Maneja el caso antes de redirigir

  return (
    <>
      <header>
        <h1>Welcome, {user?.user || "Guest"}</h1>
        <span>
          {user?.avatar && <img className="user__avatar" src={user.avatar} alt={user.user || "User"} />}
          <button onClick={handleClick}>Log Out</button>
        </span>
      </header>
    </>
  )
}
