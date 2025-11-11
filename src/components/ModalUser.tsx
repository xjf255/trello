import { createPortal } from "react-dom"
import '../styles/Modal.css'

export const ModalUser = () => {
  return createPortal(
    <div className="dark">
      <section className="modal-friendly-user">
        <header className="modal-friendly__header">
          <h2>User Details</h2>
          <figure>
            <img src="" alt="Close" />
          </figure>
        </header>
        <section className="modal-friendly__content">
          <p>Details about the user will be displayed here.</p>
        </section>
      </section>
    </div>,
    document.body
  )
}