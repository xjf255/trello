import { NavLink } from "react-router";
import { PATHS } from "../utils/constant";

export default function Home() {
  return (
    <>
      <h1>Trello</h1>
      <NavLink to={PATHS.verification}>Sign In</NavLink>
    </>
  )
}