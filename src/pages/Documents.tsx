import { Plus } from "../components/Icons";
import '../styles/Document.css'

export default function Documents() {
  return (
    <section className="documents">
      <ul className="documents__list">
        <li>
          <div className="documents__new">
            <Plus />
          </div>
          New document
        </li>
      </ul>
    </section>
  )
}