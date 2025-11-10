import { createPortal } from "react-dom"

export const ModalUser = () =>{
  return createPortal(
    <div>Modal User</div>,
    document.body
  )
}