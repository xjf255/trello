import { useNavigate } from "react-router-dom"
import { useUserActions } from "../hooks/useUserActions"
import { PATHS } from "../utils/constant"

export default function Avatar() {
  const { user } = useUserActions()
  const navigate = useNavigate()
  const changePage = (URL: string) => {
    navigate(URL)
  }
  return (
    <figure onClick={() => changePage(PATHS.user.settings)}
      style={{cursor: "pointer", width: "50px", height: "50px"}}>
      {user?.avatar && <img className="user__avatar" src={user.avatar as string} alt={user.user || "User"} />}
    </figure>
  )
}