import { Trash2, UserRoundPlus } from "lucide-react"
import "../styles/People.css"

export default function Peoples() {
  const peoples = [
    { id: 1,avatar: "https://res.cloudinary.com/dkshw9hik/image/upload/v1736294033/avatardefault_w9hsxz.webp", name: "John Doe", email: "admin@gmail.com" },
    { id: 2,avatar: "", name: "Jane Smith", email: ""},
    { id: 3,avatar: "", name: "Alice Johnson", email: ""},
    { id: 4,avatar: "", name: "Bob Brown", email: ""}
  ]

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    console.log(`Searching for: ${query}`);
  }

  return (
    <section className="people">
      <div className="people__container">
        <header>
          <div>
            <h4>People</h4>
            <button><UserRoundPlus size={18} /></button>
          </div>
        </header>
        <hr />
        <label>
          <input type="text" placeholder="Search" onChange={handleSearch}/>
        </label>
        <ul>
          {peoples.length === 0 && (
            <li>
              <p>There are not people</p>
            </li>
          )}
          {
            peoples.map((person) => (
              <li key={person.id}>
                <figure>
                  <img src={person.avatar || "https://res.cloudinary.com/dkshw9hik/image/upload/v1736294033/avatardefault_w9hsxz.webp"} className="avatar" alt={person.name} />
                </figure>
                <strong>{person.name}</strong>
                <button><Trash2 size={18} color="red" /></button>
              </li>
            ))
          }
        </ul>
      </div>
    </section>
  )
}