import { forwardRef, useState } from "react"
import { IBoardWithId, Id, IUsers } from "../types"
import { useBoardActions } from "../hooks/useBoardActions"
import { InputFile } from "./InputFile"
import { CommentIcon, IconUpload, LikeIcon } from "./Icons"
import { Comments } from "./Comments"

interface Props {
  boardItem: IBoardWithId
  user: IUsers
}

export const BoardInteractive = forwardRef<HTMLInputElement, Props>(({ boardItem, user }, ref) => {
  const { addComment, toggleLike } = useBoardActions()
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

  return (
    <footer>
      <InputFile name='file' typesAccepted='*' customLoader ref={ref} />
      <div>
        <textarea name="newComment" placeholder='add comment...' onKeyDown={(e) => handleAddComment(e, boardItem.id)} />
        <div>
          <i className={boardItem.likes.includes(user.id) ? "liked" : ""} onClick={() => handleLike(boardItem.id)}><LikeIcon /></i>
          <span>{boardItem.likes.length}</span>
        </div>
        <div>
          <i onClick={() => setShowComments(prev => !prev)}><CommentIcon /></i>
          <span>{boardItem.comments.length}</span>
        </div>
        <i onClick={handleUploadClick}><IconUpload /></i>
      </div>
      {showComments && <Comments comments={boardItem.comments} />}
    </footer>
  )
})
