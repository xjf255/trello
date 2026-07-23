import { useState } from "react"
import { Outlet } from "react-router-dom"
import { NotAuthorized } from "./NotAuthorized"
import Header from "../user/components/Header"
import Aside from "../user/components/Aside"
import { ModalProvider } from "../context/modal/sliceState"
import UserHelp from "./UserHelp"
import { ModalHelp } from "./ModalHelp"

interface Props {
  isAuthenticated: boolean
}

export default function ProtectedRoutes({ isAuthenticated = false }: Props) {
  const [isHelpOpen, setIsHelpOpen] = useState(false)

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
      <UserHelp onClick={() => setIsHelpOpen(true)} />
      <ModalHelp dialog={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
    </ModalProvider>
  )
}