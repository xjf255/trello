import { useNavigate } from "react-router-dom"
import { PATHS } from "../utils/constant"

export default function NotFound() {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate(PATHS.default)
  }
  return (
    <>
      404 this is not the web page you are looking for
      <button onClick={handleClick}>go home</button>
    </>
  )
}