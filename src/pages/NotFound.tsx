import { useNavigate } from "react-router-dom"
import { PATHS } from "../utils/constant"
import "../styles/NotFound.css"
import notFoundImage from "../../public/notFound.svg"

export default function NotFound() {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate(PATHS.default)
  }
  return (
    <section>
      <div className="not-found">
        <img src={notFoundImage} />
        We can´t find this page, But we can help you find the right one.
        <button onClick={handleClick}>go home</button>
      </div>
    </section>
  )
}