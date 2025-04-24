import { NavLink } from "react-router-dom"
import { PATHS } from "../../utils/constant"
import { Calendar1, ChevronsLeft, CircleUserRound, FileText, LayoutDashboard, Settings, Users } from "lucide-react"
import { useUserActions } from "../../hooks/useUserActions"
import "../../styles/Aside.css"

export default function Aside() {
  const { user } = useUserActions()

  const iconsTop = [
    { name: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { name: "Documents", icon: <FileText size={18} /> },
    { name: "Calendar", icon: <Calendar1 size={18} /> },
    { name: "People", icon: <Users size={18} /> },
  ]

  const listFooter = [
    { name: "Settings", icon: <Settings size={18} />, path: PATHS.user.settings },
    { name: user.user, icon: <CircleUserRound />, path: PATHS.user.profile },
  ]

  const handleHideAside = () => {
    const aside = document.querySelector("aside")
    const main = document.querySelector("main")
    if (aside && main) {
      aside.classList.toggle("--hide")
      main.classList.toggle("aside--hide")
      document.querySelector(".aside__head--icon")?.classList.toggle("rotate")
    }
  }

  return (
    <aside>
      <header className="aside__head">
        <p>logo</p>
        <ChevronsLeft
          className="aside__head--icon"
          size={18}
          style={{ cursor: "pointer", margin: "2px" }}
          onClick={handleHideAside}
        />
      </header>
      <ul>
        {Object.entries(PATHS.user.workerspace).map(([space, path]) => {
          const icon = iconsTop.find(
            (icon) => icon.name.toLowerCase() === space.toLowerCase()
          )?.icon

          return (
            <li key={space}>
              <NavLink
                to={path}
                className={({ isActive }) => isActive ? "item--select" : ""}
              >
                {icon}
                <span>
                  {space}
                </span>
              </NavLink>
            </li>
          )
        })}
      </ul>

      <footer className="aside__footer">
        <ul>
          <li className="get--pro">
            <button>Get Pro</button>
          </li>
          {listFooter.map((item, index) => {
            return (
              <li key={index}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => isActive ? "item--select" : ""}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </NavLink>
              </li>
            )
          })}
        </ul>
      </footer>
    </aside>
  )
}