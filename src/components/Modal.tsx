import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { CloseModal } from './Icons'
import '../styles/Modal.css'
import { useModal } from '../hooks/useModal'
import { TASK_COLORS } from '../utils/constant'
import { useTaskActions } from '../hooks/useTaskActions'

export function Modal() {
  const [color, setColor] = useState("")
  const { create } = useTaskActions()
  const { isOpen, changeModalState } = useModal()
  const formRef = useRef(null)

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!formRef.current) return
    const $form = new FormData(formRef.current)
    const taskTitle = $form.get("title")?.toString().trim()
    const taskDescription = $form.get("description")?.toString().trim()
    const date = localStorage.getItem("taskDate")
    if (taskTitle === "" || taskDescription === "" || color === "" || !date) return
    const dateInfo = JSON.parse(date)
    create({ taskTitle, taskDescription, color, ...dateInfo })
    changeModalState()
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") changeModalState()
    }

    if (isOpen) document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, changeModalState])

  if (!isOpen) return null

  return createPortal(
    <div className='dark' onClick={changeModalState}>
      <div className="task--new" onClick={(event) => event.stopPropagation()}>
        <header className='modal__title'>
          <h2>Tasks details</h2>
          <figure className='title__close' onClick={changeModalState}>
            <CloseModal />
          </figure>
        </header>
        <form className='task__modal' ref={formRef}>
          <label>
            Title:
            <input type="text" name="title" placeholder='My task...' />
          </label>
          <label>
            Description:
            <textarea name="description"></textarea>
          </label>
          <label>Color:</label>
          <section className='circle__area'>
            {TASK_COLORS.map(color => (
              <input
                key={color}
                name="color"
                className='circle'
                type='radio'
                onClick={() => setColor(`#${color}`)}
                style={{ backgroundColor: `#${color}` }}
              />
            ))}
          </section>
          <button onClick={handleClick}>create task</button>
        </form>
      </div>
    </div>,
    document.body
  )
}
