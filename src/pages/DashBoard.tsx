import { useRef, useState } from 'react'
import '../styles/Dashboard.css'
import { CommentIcon, IconUpload, LikeIcon } from '../components/Icons'
import { useUserActions } from '../hooks/useUserActions'
import { ShowTimer } from '../components/ShowTimer'
import { InputFile } from '../components/InputFile'
import { useBoardActions } from '../hooks/useBoardActions'
import { Id } from '../types'
import { useModal } from '../hooks/useModal'
import { Modal } from '../components/Modal'

export default function DashBoard() {
  const { board, addComment, toogleLike } = useBoardActions()
  const { user } = useUserActions()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [showComments, setShowComments] = useState(false)
  const { changeModalState } = useModal()

  const handleAddComment = (e: React.KeyboardEvent<HTMLTextAreaElement>, boardId: Id) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addComment(boardId, { comment: e.currentTarget.value, date: Date.now(), users: user?.user ?? "" })
      e.currentTarget.value = ""
    }
  }

  const handleLike = (boardId: Id) => {
    toogleLike(boardId, user?.id ?? "")
  }

  const handleUploadClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    console.log("upload", inputRef.current)
    inputRef.current?.click()
  }

  const createBoard = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    changeModalState()
  }

  return (
    <section className="dashboard">
      <header className="dashboard__header">
        <h4>Dashboard</h4>
        <button onClick={createBoard}>new Board</button>
      </header>
      <ul className='dashboard__list'>
        {board?.map(todo => (
          <article key={todo.id} className='dashboard__item'>
            <header>
              <div>
                <h5>{todo.title}</h5>
                <p>{todo.owner}</p>
                <ShowTimer time={todo.date} />
              </div>
            </header>
            <div>
              <p>{todo.description}</p>
            </div>
            <footer>
              <InputFile name='file' typesAccepted='*' customLoader ref={inputRef} />
              <div>
                <textarea name="newComment" placeholder='add comment...' onKeyUp={(e) => handleAddComment(e, todo.id)} />
                <div>
                  <i className={todo.likes.includes(user?.id ?? "") ? "liked" : ""} onClick={() => handleLike(todo.id)}><LikeIcon /></i>
                  <span>{todo.likes.length}</span>
                </div>
                <div>
                  <i onClick={() => setShowComments(prev => !prev)}><CommentIcon /></i>
                  <span>{todo.comments.length}</span>
                </div>
                <i onClick={handleUploadClick}><IconUpload /></i>
              </div>
            </footer>
            {showComments && <section className="comments">
              {todo.comments.map(comment => (
                <div className='comments__comment' key={comment.commentId}>
                  <figure>
                    <img src="https://via.placeholder.com/150" alt="profile" />
                  </figure>
                  <div className='comment__content'>
                    <p className='comment__user'><strong>{comment.users}</strong></p>
                    <p>{comment.comment}</p>
                    <ShowTimer time={comment.date} />
                  </div>
                </div>
              ))}
            </section>}
          </article>
        ))}
      </ul>
      <Modal isDashboard/>
    </section>
  )
}
