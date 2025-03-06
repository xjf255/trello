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
      <main>
        <div className="hero" />
        <Outlet />
      </main>
    </>
  )
}