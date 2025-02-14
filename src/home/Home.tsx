import { NavLink, Outlet } from "react-router"
import { PATHS } from "../utils/constant"
import Calendar from "../user/Calendar"
import { Modal } from "../components/Modal"

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
        <Calendar />
        <Modal />
        <Outlet />
      </main>
    </>
  )
}