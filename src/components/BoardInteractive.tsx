import { forwardRef, useState } from "react"
import { IBoardWithId, Id, IUsers } from "../types"
import { useBoardActions } from "../hooks/useBoardActions"
import { InputFile } from "./InputFile"
import { Comments } from "./Comments"
import { CloudUpload, Heart, MessageCircle } from "lucide-react"

interface Props {
  boardItem: IBoardWithId
  user: IUsers
}

export const BoardInteractive = forwardRef<HTMLInputElement, Props>(({ boardItem, user }, ref) => {
  const { addComment, toggleLike, attachFile } = useBoardActions()
  const [showComments, setShowComments] = useState(false)

  const handleAddComment = (e: React.KeyboardEvent<HTMLTextAreaElement>, boardId: Id) => {
    if (e.key === "Enter" && e.currentTarget.value.trim() !== "") {
      e.preventDefault()
      addComment(boardId, { comment: e.currentTarget.value, date: Date.now(), users: { user: user.user, avatar: user.avatar } })
      e.currentTarget.value = ""
    }
  }

  const handleLike = (boardId: Id) => {
    toggleLike(boardId, user.id)
  }

  const handleUploadClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (!ref) return
    if (typeof ref === 'function') {
      console.log("upload", null)
    } else {
      console.log("upload", ref.current)
      ref.current?.click()
    }
  }

  const handleFileSelect = (file: File) => {
    attachFile(boardItem.id, file.name)
  }

  return (
    <footer>
      <InputFile name='file' typesAccepted='*' customLoader ref={ref} onFileSelect={handleFileSelect} />
      {boardItem.files && boardItem.files.length > 0 && (
        <div className="board__item--files" style={{ padding: "0.25rem 0.5rem", fontSize: "0.85rem", color: "#666", display: "flex", flexDirection: "column", gap: "2px" }}>
          {boardItem.files.map((file, idx) => (
            <div key={idx} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <span>📎</span>
              <span>{file}</span>
            </div>
          ))}
        </div>
      )}
      <div>
        <textarea name="newComment" placeholder='add comment...' onKeyDown={(e) => handleAddComment(e, boardItem.id)} />
        <div>
          <i className={boardItem.likes.includes(user.id) ? "liked" : ""} onClick={() => handleLike(boardItem.id)}><Heart /></i>
          <span>{boardItem.likes.length}</span>
        </div>
        <div>
          <i onClick={() => setShowComments(prev => !prev)}><MessageCircle /></i>
          <span>{boardItem.comments.length}</span>
        </div>
        <i onClick={handleUploadClick}><CloudUpload /></i>
      </div>
      {showComments && <Comments comments={boardItem.comments} />}
    </footer>
  )
})
