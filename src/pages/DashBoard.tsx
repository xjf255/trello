import { useState } from 'react'
import '../styles/Dashboard.css'

const BoardExample = [{
  id: 1,
  title: "Test",
  description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo eligendi nam illum cumque totam ipsa quae velit illo laudantium explicabo, sed cupiditate, harum nemo vero quibusdam non saepe labore. Facilis?Possimus, vel. Voluptatum accusamus at numquam sunt dicta itaque incidunt, laboriosam aliquid. Illo voluptatibus facilis dignissimos doloremque, amet cupiditate fugit alias iure voluptates ex earum? Delectus reprehenderit atque consequatur aut.",
  owner: "yo xd",
  users: [
    "lupe"
  ],
  comments: [
    {
      commentId: 1,
      users: "lupe",
      comment: "No pongas ni mierda entonces",
      hora: "hace 1 min"
    }
  ]
}]

export default function DashBoard() {
  const [showComments, setShowComments] = useState(false)
  return (
    <section className="dashboard">
      <header className="dashboard__header">
        <h4>Dashboard</h4>
        <button>new Board</button>
      </header>
      <ul className='dashboard__list'>
        {BoardExample.map(todo => (
          <article key={todo.id} className='dashboard__item'>
            <header>
              <div>
                <h5>{todo.title}</h5>
                <p>{todo.owner}</p>
              </div>
            </header>
            <body>
              <p>{todo.description}</p>
            </body>
            <footer>
              <textarea name="newComment" placeholder='add comment...' />
              {!showComments && todo.comments.length > 0 && <button className='btn--show' onClick={() => setShowComments(prev => !prev)}>load comments</button>}
              {showComments && todo.comments.map(comment => (
                <div key={comment.commentId}>
                  <p>{comment.comment}</p>
                  <p><strong>{comment.users}</strong></p>
                </div>
              ))}
            </footer>
          </article>
        ))}
      </ul>
    </section>
  )
}
