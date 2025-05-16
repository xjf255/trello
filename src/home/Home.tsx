import { NavLink, Outlet } from "react-router-dom"
import { PATHS } from "../utils/constant"

export default function Home() {
  return (
    <>
      <header>
        <h1>OP</h1>
        <span>
          <button className="nav_el">Products</button>
          <button className="nav_el">Pricing</button>
          <NavLink to={PATHS.verification.signup} className="nav_el">Sign up</NavLink>
          <NavLink to={PATHS.verification.login} className="btn_login nav_el">Try for free</NavLink>
        </span>
      </header>
      <main>
        <div className="hero" />
        <Outlet />
      </main>
    </>
  )
}