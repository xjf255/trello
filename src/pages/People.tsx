import { Trash2, UserRoundPlus, UserRoundSearch } from "lucide-react"
import "../styles/People.css"

export default function Peoples() {
  const peoples = [
    { id: 1, name: "John Doe", email: "preuba" }
  ]
  return (
    <section className="people">
      <div className="people__container">
        <header>
          <div>
            <h4>Peoples</h4>
            <button><UserRoundPlus size={18} /></button>
          </div>
        </header>
        <hr />
        <label>
          <input type="text" placeholder="Search" />
          <button><UserRoundSearch size={18} /></button>
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
                <strong>{person.name}</strong>
                <p>{person.email}</p>
                <button><Trash2 size={18} color="red" /></button>
              </li>
            ))
          }
        </ul>
      </div>
    </section>
  )
}