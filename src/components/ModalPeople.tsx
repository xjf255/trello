import { UserRoundPlus } from "lucide-react"
import { usePeopleActions } from "../hooks/usePeopleActions"
import { useState, useEffect, useRef } from "react"
import { toast } from "sonner"

interface ModalPeopleProps {
  isOpen: boolean
  onClose: () => void
}

export const ModalPeople = ({ isOpen, onClose }: ModalPeopleProps) => {
  const { addPerson } = usePeopleActions()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (isOpen) {
      dialog.showModal()
    } else {
      dialog.close()
    }
  }, [isOpen])

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
      await addPerson({ email: email.trim() })
      setEmail("")
      onClose()
    } catch (error) {
      console.error("Failed to add person:", error)
      const errorMessage = typeof error === "object" && error !== null && "message" in error
        ? (error as { message?: string }).message
        : undefined;
      toast.error(errorMessage || "Failed to add person")
    } finally {
      setIsLoading(false)
    }
  }

  const handleBackdropClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  return (
    <dialog 
      ref={dialogRef}
      onClick={handleBackdropClick}
      className="modal-people"
      style={{ margin: 'auto'}}
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
        
        <div className="modal-footer" style={{marginTop: '1rem'}}>
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