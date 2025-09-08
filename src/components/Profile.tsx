import { useUserActions } from "../hooks/useUserActions";
import "../styles/Profile.css"

export default function Profile() {
  const { user } = useUserActions();
  console.log(user)
  return (
    <section className="profile">
      <div className="profile__container">
        <header>
          <h4>Profile</h4>
        </header>
        <div className="profile__info">
          <figure>
            <img src={user.avatar || "https://res.cloudinary.com/dkshw9hik/image/upload/v1736294033/avatardefault_w9hsxz.webp"} className="avatar" alt={user.user} />
          </figure>
          <strong>{user.user}</strong>
          <p>{user.email}</p>
        </div>
      </div>
    </section>
  )
}