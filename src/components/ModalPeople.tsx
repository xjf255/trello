import { UserRoundPlus, X } from "lucide-react"
import { usePeopleActions } from "../hooks/usePeopleActions"
import { useState, useEffect, useRef } from "react"

interface ModalPeopleProps {
  isOpen: boolean
  onClose: () => void
}

export const ModalPeople = ({ isOpen, onClose }: ModalPeopleProps) => {
  const { addPerson } = usePeopleActions()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)

  // Handle dialog open/close based on isOpen prop
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (isOpen) {
      dialog.showModal()
    } else {
      dialog.close()
    }
  }, [isOpen])

  // Close modal when dialog is closed (including ESC key or backdrop click)
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    const handleClose = () => {
      setEmail("")
      onClose()
    }

    dialog.addEventListener('close', handleClose)
    return () => dialog.removeEventListener('close', handleClose)
  }, [onClose])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    
    if (!email.trim()) return

    setIsLoading(true)
    try {
      // TODO: update API to get information from the email
      await addPerson({ email: email.trim() })
      setEmail("") // Reset form
      onClose() // Close modal on success
    } catch (error) {
      console.error("Failed to add person:", error)
      // Handle error (show toast, etc.)
    } finally {
      setIsLoading(false)
    }
  }

  const handleBackdropClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    // Close modal when clicking on backdrop (outside the form)
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  return (
    <dialog 
      ref={dialogRef}
      onClick={handleBackdropClick}
      className="modal-people"
    >
      <form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Add New Person</h3>
        </div>
        
        <div className="modal-body">
          <input
            id="email-input"
            type="email"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        
        <div className="modal-footer">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="cancel-button"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading || !email.trim()}
            className="submit-button"
          >
            <UserRoundPlus size={18} />
            {isLoading ? 'Adding...' : 'Add Person'}
          </button>
        </div>
      </form>
    </dialog>
  )
}