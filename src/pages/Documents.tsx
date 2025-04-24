import { Link } from "react-router-dom";
import '../styles/Document.css'
import { PATHS } from "../utils/constant";
import { FilePlus2 } from "lucide-react";

export default function Documents() {
  const newDocument = crypto.randomUUID()
  return (
    <section className="documents">
      <ul className="documents__list">
        <li>
          <Link className="documents__new" to={PATHS.user.workerspace.documents + `/${newDocument}`} viewTransition>
            <FilePlus2 />
          </Link>
        </li>
      </ul>
    </section>
  )
}