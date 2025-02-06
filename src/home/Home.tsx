import { NavLink, Outlet } from "react-router"
import { PATHS } from "../utils/constant"

export default function Home() {
  return (
    <>
      <header>
        <h1>Trello</h1>
        <span>
          <NavLink to={PATHS.verification.signup}>Sign up</NavLink>
          <NavLink to={PATHS.verification.login}>Login</NavLink>
        </span>
      </header>
      <main />
      <figure>
        <img src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png" alt="image" />
      </figure>
      <Outlet />
    </>
  )
}