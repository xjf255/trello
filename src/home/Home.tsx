import { NavLink, Outlet } from "react-router-dom"
import { PATHS } from "../utils/constant"
import { HeroSection } from "../verification/components/HeroSection"
import { Pricing } from "./Pricing"
import { About } from "./About"

export default function Home() {
  return (
    <>
      <header className="header__nav">
        <img src="/logo.svg" alt="OL" width={50} />
        <span>
          <NavLink to={PATHS.verification.signup} className="nav_el">Sign up</NavLink>
          <NavLink to={PATHS.verification.login} className="btn_login nav_el">Try for free</NavLink>
        </span>
      </header>
      <main>
        <div className="hero">
          <HeroSection />
          <Pricing />
          <About />
        </div>
        <Outlet />
      </main>
    </>
  )
}