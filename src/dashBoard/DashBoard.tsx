import { useNavigate } from "react-router"
import { PATHS } from "../utils/constant"

export default function DashBoard() {
  const navigate = useNavigate()

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    
    try {
      const response = await fetch('http://localhost:1234/verification/logout', { 
        method: "POST",
        credentials: "include"
      })
      
      if (response.ok) {
        navigate(PATHS.verification.login)
      } else {
        console.error("Error en logout:", response.statusText)
      }
    } catch (error) {
      console.error("Error de red:", error)
    }
  }

  return (
    <>
      Home
      <button onClick={handleClick}>log out</button>
    </>
  )
}