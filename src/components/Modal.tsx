import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { CloseModal } from './Icons'
import '../styles/Modal.css'
import { useModal } from '../hooks/useModal'
import { TASK_COLORS } from '../utils/constant'

export function Modal() {
  const { isOpen, changeModalState } = useModal()

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    //todo
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
        <form className='task__modal'>
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
