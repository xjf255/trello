import { useRef, useState } from "react";
import { IBoardWithId, IComment, Id } from "../types";
import { useUserActions } from "../hooks/useUserActions";
import { useBoardActions } from "../hooks/useBoardActions";
import { ShowTimer } from "./ShowTimer";
import { InputFile } from "./InputFile";
import { ClockIcon, CommentIcon, DoneIcon, EditIcon, IconUpload, LikeIcon, PendientIcon } from "./Icons";
import { Texts } from "./Texts";
import { optionsStatusBoard } from "../utils/constant";

export default function BoardItem(boardItem: IBoardWithId) {
  const { addComment, toogleLike } = useBoardActions()
  const { user } = useUserActions()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [showComments, setShowComments] = useState(false)

  const handleAddComment = (e: React.KeyboardEvent<HTMLTextAreaElement>, boardId: Id) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addComment(boardId, { comment: e.currentTarget.value, date: Date.now(), users: { user: user.user, avatar: user.avatar } })
      e.currentTarget.value = ""
    }
  }

  const handleLike = (boardId: Id) => {
    toogleLike(boardId, user.id)
  }

  const handleUploadClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    console.log("upload", inputRef.current)
    inputRef.current?.click()
  }

  return (
    <article key={boardItem.id} className='dashboard__item'>
      <header>
        <div>
          <h5>{boardItem.title}</h5>
          <p>{boardItem.owner}</p>
          <ShowTimer time={boardItem.date} />
        </div>
        <div>
          {boardItem.status === optionsStatusBoard[2].value && <i><ClockIcon /></i>}
          {boardItem.status === optionsStatusBoard[3].value && <i><DoneIcon /></i>}
          {boardItem.status === optionsStatusBoard[1].value && <i><PendientIcon /></i>}
          {boardItem.owner === user.user && <i><EditIcon /></i>}
        </div>
      </header>
      <span className="dashboard__item--content">
        <Texts text={boardItem.description} />
      </span>
      <footer>
        <InputFile name='file' typesAccepted='*' customLoader ref={inputRef} />
        <div>
          <textarea name="newComment" placeholder='add comment...' onKeyUp={(e) => handleAddComment(e, boardItem.id)} />
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
      </footer>
      {showComments && <section className="comments">
        {boardItem.comments.map((comment: IComment) => (
          <div className='comments__comment' key={comment.commentId}>
            <figure>
              <img src={comment.users.avatar as string} alt="profile" />
            </figure>
            <div className='comment__content'>
              <p className='comment__user'><strong>{comment.users.user}</strong></p>
              <Texts text={comment.comment} />
              <ShowTimer time={comment.date} />
            </div>
          </div>
        ))}
      </section>}
    </article>
  )
}