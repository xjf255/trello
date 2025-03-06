import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { CloseModal } from './Icons'
import '../styles/Modal.css'
import { useModal } from '../hooks/useModal'
import { TASK_COLORS } from '../utils/constant'
import { useTaskActions } from '../hooks/useTaskActions'
import { useBoardActions } from '../hooks/useBoardActions'
import { useUserActions } from '../hooks/useUserActions'

const DEFAULT_FORM = {
  taskTitle: "",
  color: "",
  taskDescription: ""
}

export function Modal({ isDashboard = false }: { isDashboard?: boolean }) {
  const [color, setColor] = useState("")
  const { create } = useTaskActions()
  const { user } = useUserActions()
  const { createNewBoard } = useBoardActions()
  const [defaultFormValues, setDefaultFormValues] = useState(DEFAULT_FORM)
  const { isOpen, changeModalState } = useModal()
  const formRef = useRef<HTMLFormElement | null>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!formRef.current) return
    const $form = new FormData(formRef.current)
    const taskTitle = $form.get("title")?.toString().trim()
    const taskDescription = $form.get("description")?.toString().trim()
    const date = localStorage.getItem("taskDate")
    const members = $form.get("members")?.toString().trim()
    if (!taskTitle || !taskDescription || !date) return
    if (!isDashboard) {
      if (color === "") return
      const dateInfo = JSON.parse(date)
      create({ taskTitle, taskDescription, color, ...dateInfo })
    } else {
      if (!members) return
      createNewBoard({ title: taskTitle, description: taskDescription, owner: user?.user ?? "", date: Date.now(), users: members.split(",") })
    }
    changeModalState()
  }

  useEffect(() => {
    const taskToUpdate = localStorage.getItem('taskToUpdate')
    if (taskToUpdate) {
      setDefaultFormValues(JSON.parse(taskToUpdate))
      localStorage.removeItem("taskToUpdate")
    } else { setDefaultFormValues(DEFAULT_FORM) }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") changeModalState()
    }

    if (isOpen) document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
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
        <form className='task__modal' ref={formRef} onSubmit={handleSubmit}>
          <label>
            Title:
            <input type="text" name="title" placeholder='My task...' defaultValue={defaultFormValues.taskTitle} />
          </label>
          <label>
            Description:
            <textarea name="description" defaultValue={defaultFormValues.taskDescription}></textarea>
          </label>
          {isDashboard && <label>
            Members:
            <input name="members" placeholder='ej. trello@gmail.com,...'></input>
          </label>}
          {!isDashboard && <>
            <label>Color:</label>
            <section className='circle__area'>
              {TASK_COLORS.map(color => (
                <input
                  key={color}
                  name="color"
                  className='circle'
                  type='radio'
                  defaultChecked={defaultFormValues.color === `#${color}`}
                  onClick={() => setColor(`#${color}`)}
                  style={{ backgroundColor: `#${color}` }}
                />
              ))}
            </section>
            </>}
          <button>create task</button>
        </form>
      </div>
    </div>,
    document.body
  )
}