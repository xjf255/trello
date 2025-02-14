import { createPortal } from 'react-dom'
import { CloseModal } from './Icons'

export function Modal() {
  // document.addEventListener("keydown", e => {
  //   if (isOpen) {
  //     if (e.key === "Escape") closeModal()
  //   }
  // })

  // if (!isOpen) return
  return createPortal(
    <div className='dark'  >
      <div className="task--new" onClick={(event) => event.stopPropagation()}>
        <header className='modal__title'>
          <h2>Tasks details</h2>
          <figure className='title__close' >
            <CloseModal />
          </figure>
        </header>
      </div>
    </div>, document.body
  )
}