import { createPortal } from "react-dom";

export default function ConfigModal({ positionX, positionY }: { positionX: number, positionY: number }) {

  return createPortal(
    <div className="config__modal" style={{ top: positionY, left: positionX}}>

    </div>,
    document.body
  )
}