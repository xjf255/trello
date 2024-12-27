import { NavLink, Outlet } from "react-router";
import { PATHS } from "../utils/constant";

export default function Home() {
  return (
    <>
      <h1>Trello</h1>
      <NavLink to={PATHS.verification.default}>Login</NavLink>
      <Outlet />
    </>
  )
}