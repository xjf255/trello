import { Trash2 } from "lucide-react";
import { IPeopleState } from "../types";

export const PeopleSection = ({ people }: { people: IPeopleState[] | null }) => {
  if (!people || people.length === 0) {
    return (
      <li>
        <p>There are not people</p>
      </li>
    )
  }
  return (
    <>
      {
        people.map((person) => (
          <li key={person.id}>
            <figure>
              <img src={person.avatar || "https://res.cloudinary.com/dkshw9hik/image/upload/v1736294033/avatardefault_w9hsxz.webp"} className="avatar" alt={person.user} />
            </figure>
            <strong>{person.user}</strong>
            <button><Trash2 size={18} color="red" /></button>
          </li>
        ))
      }
    </>
  )
}