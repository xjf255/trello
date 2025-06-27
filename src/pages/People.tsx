import { UserRoundPlus } from "lucide-react"
import "../styles/People.css"
import { usePeopleActions } from "../hooks/usePeopleActions";
import { PeopleSection } from "../components/PeopleSection";

export default function Peoples() {
  const { people } = usePeopleActions();

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
          <input type="text" placeholder="Search" onChange={handleSearch} />
        </label>
        <ul>
          <PeopleSection people={people} />
        </ul>
      </div>
    </section>
  )
}