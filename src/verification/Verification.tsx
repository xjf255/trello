import { Outlet, useNavigate } from "react-router-dom"
import { PATHS } from "../utils/constant"
import { useEffect } from "react"

export default function Verification() {
  const navigator = useNavigate()
  useEffect(() => {
    if (location.pathname === '/verification') {
      navigator(PATHS.verification.login)
    }
  }, [navigator])
  return (
    <section className="verification">
      <div className="verification__modal">
        <h1>Verification</h1>
        <Outlet />
      </div>
    </section>
  )
}