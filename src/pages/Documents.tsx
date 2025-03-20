import { Link } from "react-router-dom";
import { Plus } from "../components/Icons";
import '../styles/Document.css'
import { PATHS } from "../utils/constant";

export default function Documents() {
  const newDocument = crypto.randomUUID()
  return (
    <section className="documents">
      <ul className="documents__list">
        <li>
          <Link className="documents__new" to={PATHS.user.workerspace.documents + `/${newDocument}`} viewTransition>
            <Plus />
          </Link>
        </li>
      </ul>
    </section>
  )
}