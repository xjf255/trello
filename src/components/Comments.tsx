import { IComment } from "../types"
import { ShowTimer } from "./ShowTimer"
import { Texts } from "./Texts"

export function Comments({ comments }: { comments: IComment[] }) {
  return (
    <section className="comments">
      {comments.map((comment: IComment) => (
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
    </section>
  )
}