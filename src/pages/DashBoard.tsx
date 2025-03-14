import '../styles/Dashboard.css'
import { useBoardActions } from '../hooks/useBoardActions'
import { useModal } from '../hooks/useModal'
import { Modal } from '../components/Modal'
import BoardItem from '../components/BoardItem'
import { CustomSelect } from '../components/CustomSelect'
import { STATUS_BOARD } from '../utils/constant'
import { ConfigProvider, ModalContext } from '../context/modal/sliceState'

export default function DashBoard() {
  const { board } = useBoardActions()
  const { changeModalState } = useModal(ModalContext)

  const createBoard = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    changeModalState()
  }

  return (
    <ConfigProvider>
      <section className="dashboard">
        <header className="dashboard__header">
          <span>
            <h4>Dashboard</h4>
            <CustomSelect options={STATUS_BOARD} disable={board?.length === 0} />
          </span>
          <button onClick={createBoard}>new Board</button>
        </header>
        <ul className='dashboard__list'>
          {board?.map(todo => (
            <BoardItem key={todo.id} {...todo} />
          ))}
        </ul>
        <Modal isDashboard />
      </section>
    </ConfigProvider>
  )
}
