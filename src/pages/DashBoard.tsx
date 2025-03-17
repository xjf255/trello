import { useCallback, useEffect, useState } from 'react';
import { SingleValue } from 'react-select';
import { ItemStatusBoard } from '../types';
import { useBoardActions } from '../hooks/useBoardActions';
import { useModal } from '../hooks/useModal';
import { Modal } from '../components/Modal';
import BoardItem from '../components/BoardItem';
import { CustomSelect } from '../components/CustomSelect';
import { STATUS_BOARD } from '../utils/constant';
import { ModalContext } from '../context/modal/sliceState';
import '../styles/Dashboard.css';

export default function DashBoard() {
  const { board: currentBoard } = useBoardActions();
  const { changeModalState } = useModal(ModalContext);
  const [board, setBoard] = useState(currentBoard);
  const [stateSelected, setStateSelected] = useState<ItemStatusBoard | null>(STATUS_BOARD[0]);

  const createBoard = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    changeModalState();
  };

  const filterBoard = useCallback((state: SingleValue<ItemStatusBoard | null>) => {
    setStateSelected(state);
  }, []);

  const filter = useCallback(() => {
    if (!currentBoard) return;
    if (stateSelected === null || !stateSelected.value) {
      setBoard(currentBoard);
    } else {
      setBoard(currentBoard.filter(item => item.status === stateSelected.value));
    }
  }, [currentBoard, stateSelected]);

  useEffect(() => {
    filter();
  }, [filter]);

  return (
    <section className="dashboard">
      <header className="dashboard__header">
        <span>
          <h4>Dashboard</h4>
          <CustomSelect
            options={STATUS_BOARD}
            updateBoard={filterBoard}
            initialState={stateSelected}
          />
        </span>
        <button onClick={createBoard}>New Board</button>
      </header>
      <ul className="dashboard__list">
        {board?.map(todo => (
          <BoardItem key={todo.id} {...todo} />
        ))}
      </ul>
      <Modal isDashboard />
    </section>
  );
}