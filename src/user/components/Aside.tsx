import { NavLink } from "react-router-dom";
import { PATHS } from "../../utils/constant";
import "../../styles/Aside.css"

export default function Aside() {
  return (
    <aside>
      <ul>
        {Object.entries(PATHS.user.workerspace).map(([space, path]) => {
          return (
            <li key={space}>
              <NavLink to={path}>{space}</NavLink>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}