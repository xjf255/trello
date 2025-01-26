import { NavLink } from "react-router"
import { PATHS } from "../../utils/constant"

export const Toggle = () => {
  return (
    <div className="auth__toggle">
      <NavLink to={PATHS.verification.signup}>Sign Up</NavLink>
      <NavLink to={PATHS.verification.login}>Login</NavLink>
    </div>
  )
}