import { IPeopleState } from "../types"

export const ItemUser = (user: IPeopleState) => {
  return (
    <>
      <figure className="friendly__avatar">
        <img src={user.avatar} alt={user.user} />
      </figure>
      <div className="friendly__info">
        <p>{user.user}</p>
      </div>
    </>
  )
}