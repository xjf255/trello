import { UserRoundPlus } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { toast } from "sonner"
import { useSendFriendshipRequestMutation } from "../context/people/friendlyAPI"
import { useUserActions } from "../hooks/useUserActions"

interface ModalPeopleProps {
  isOpen: boolean
  onClose: () => void
}

export const ModalPeople = ({ isOpen, onClose }: ModalPeopleProps) => {
  const [sendRequest, { isLoading, isSuccess, isError }] = useSendFriendshipRequestMutation()
  const [email, setEmail] = useState("")
  const dialogRef = useRef<HTMLDialogElement>(null)
  const { user } = useUserActions()

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

    try {
      await sendRequest({ addressee: email.trim(), requesterId: user.id })
      setEmail("")
    } catch (error) {
      console.error("Failed to add person:", error)
      const errorMessage = typeof error === "object" && error !== null && "message" in error
        ? (error as { message?: string }).message
        : undefined;
      toast.error(errorMessage || "Failed to add person")
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
      style={{ margin: 'auto' }}
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

        <div className="modal-footer" style={{ marginTop: '1rem' }}>
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
            {isLoading ? "Enviando..." : isSuccess ? "Enviada ✅" : "Agregar amigo"}
          </button>
        </div>
      </form>
    </dialog>
  )
}