import { NavLink } from "react-router-dom"
import { PATHS } from "../../utils/constant"

export const Toggle = () => {
  const isLogin = window.location.pathname === PATHS.verification.login
  return (
    <>
      {isLogin &&
        <p style={{ marginBlock: "4px" }}>Don´t have an account yet?
          <NavLink to={PATHS.verification.signup}> Sign up now</NavLink>
        </p>
      }
      {isLogin === false &&
        <p style={{ marginBlock: "4px" }}>Already have an account?
          <NavLink to={PATHS.verification.login}> Log in</NavLink>
        </p>
      }
    </>
  )
}