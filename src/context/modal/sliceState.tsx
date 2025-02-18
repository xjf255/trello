import { createContext, ReactNode, useState } from "react";

interface ModalContextType {
  isOpen: boolean
  changeModalState: () => void
}

export const ModalContext = createContext<ModalContextType | undefined>(undefined)

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const changeModalState = () => {
    setIsOpen(prev => !prev)
  }

  return (
    <ModalContext.Provider value={{ isOpen, changeModalState }}>
      {children}
    </ModalContext.Provider>
  )
}