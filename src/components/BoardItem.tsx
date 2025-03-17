import { createElement, useRef, useState } from "react";
import { IBoardWithId, ItemStatusBoard } from "../types";
import { useUserActions } from "../hooks/useUserActions";
import { ShowTimer } from "./ShowTimer";
import { Texts } from "./Texts";
import { STATUS_BOARD } from "../utils/constant";
import ConfigBoard from "./ConfigBoard";
import { BoardInteractive } from "./BoardInteractive";

export default function BoardItem(boardItem: IBoardWithId) {
  const { user } = useUserActions();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [show, changeModalState] = useState(false)

  const handleShowConfigModal = () => {
    changeModalState(prev => !prev);
  };

  return (
    <article key={boardItem.id} className='dashboard__item'>
      <header>
        <div>
          <h5>{boardItem.title}</h5>
          <p>{boardItem.owner}</p>
          <ShowTimer time={boardItem.date} />
        </div>
        <div>
          <i onClick={handleShowConfigModal}>
            {
              (() => {
                const iconComponent = STATUS_BOARD.find(
                  (status: ItemStatusBoard) => status.value === boardItem.status
                )?.icon;

                return iconComponent ? createElement(iconComponent) : null;
              })()
            }
          </i>
          {show && <ConfigBoard idBoard={boardItem.id} items={STATUS_BOARD} selected={boardItem.status} changeModalState={changeModalState}/>}
        </div>
      </header>
      <span className="dashboard__item--content">
        <Texts text={boardItem.description} />
      </span>
      <BoardInteractive boardItem={boardItem} user={user} ref={inputRef} />
    </article>
  );
}