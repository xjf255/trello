import { Outlet } from "react-router-dom"
import { NotAuthorized } from "./NotAuthorized"
import Header from "../user/components/Header"
import Aside from "../user/components/Aside"
import { ModalProvider } from "../context/modal/sliceState"
import UserHelp from "./UserHelp"
interface Props {
  isAuthenticated: boolean
}

export default function ProtectedRoutes({ isAuthenticated = false }: Props) {
  if (!isAuthenticated) return <>
    <NotAuthorized />
  </>
  return (
    <ModalProvider>
      <main>
        <Header />
        <Aside />
        <Outlet />
      </main>
      <UserHelp />
    </ModalProvider>
  )
}