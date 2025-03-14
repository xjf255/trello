import "../styles/ConfigModal.css"
import { useBoardActions } from "../hooks/useBoardActions"
import { BoardStatus } from "../type"
import { ItemStatusBoard } from "../types"
import { Peak } from "./Icons"
import { useModal } from "../hooks/useModal"
import { ConfigContext } from "../context/modal/sliceState"

interface ConfigBoardProps {
  items: ItemStatusBoard[]
  selected: string
  idBoard: string
}

export default function ConfigBoard({
  items,
  selected,
  idBoard,
}: ConfigBoardProps) {
  const { changeStatus } = useBoardActions()
  const { changeModalState } = useModal(ConfigContext)

  const handleClick = (newStatus: BoardStatus) => {
    if (newStatus === selected) return changeModalState()
    changeStatus(idBoard, newStatus)
    changeModalState()
  }

  return (
    <div className="config__modal">
      <Peak />
      <div className="body__config">
        <ul>
          {items.map((item, index) => {
            if(item.icon === null) return
            return (
              <li
                key={index}
                className={selected === item.label ? "item--select" : ""}
                onClick={() => handleClick(item.value)}
              >
                <i>
                  <item.icon />
                </i>
                <span>{item.label}</span>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}