import { NavLink, Outlet } from "react-router-dom"
import { PATHS } from "../utils/constant"

export default function Verification() {
  return (
    <>
      <h1>Verification</h1>
      <div className="auth__toggle">
        <NavLink to={PATHS.verification.signup}>Sign Up</NavLink>
        <NavLink to={PATHS.verification.login}>Login</NavLink>
      </div>
      <Outlet />
    </>
  )
}