import "../styles/ConfigModal.css"
import { useBoardActions } from "../hooks/useBoardActions"
import { BoardStatus } from "../type"
import { ItemStatusBoard } from "../types"

interface ConfigBoardProps {
  items: ItemStatusBoard[]
  selected: string
  idBoard: string
  changeModalState: (value:boolean) => void
}

export default function ConfigBoard({ items, selected, idBoard, changeModalState }: ConfigBoardProps) {
  const { changeStatus } = useBoardActions()

  const handleClick = (newStatus: BoardStatus) => {
    if (newStatus === selected) return changeModalState(false)
    changeStatus(idBoard, newStatus)
    changeModalState(false)
  }

  return (
    <div className="config__modal">
      <div className="body__config">
        <ul>
          {items.map((item, index) => {
            if (item.icon === null) return
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