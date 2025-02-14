import { NavLink } from "react-router";
import { PATHS } from "../../utils/constant";

export default function Aside() {
  return (
    <aside>
      <header>
        
      </header>
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