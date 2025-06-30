import { UserRoundPlus } from "lucide-react"
import "../styles/People.css"
import { usePeopleActions } from "../hooks/usePeopleActions"
import { PeopleSection } from "../components/PeopleSection"
import { ModalPeople } from "../components/ModalPeople"
import { useState, useMemo } from "react"

export default function Peoples() {
  const { people: allPeople, filterPeople } = usePeopleActions()
  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)

  const filteredPeople = useMemo(() => {
    if (!searchTerm.trim()) {
      return allPeople
    }
    return filterPeople(searchTerm)
  }, [allPeople, searchTerm, filterPeople])

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <section className="people">
      <div className="people__container">
        <header>
          <div>
            <h4>People</h4>
            <button 
              type="button"
              onClick={handleOpenModal}
              aria-label="Add new person"
            >
              <UserRoundPlus size={18} />
            </button>
            <ModalPeople 
              isOpen={isModalOpen} 
              onClose={handleCloseModal} 
            />
          </div>
        </header>
        <label>
          <input 
            type="text" 
            placeholder="Search" 
            value={searchTerm}
            onChange={handleSearch} 
          />
        </label>
        <ul>
          <PeopleSection people={filteredPeople} />
        </ul>
      </div>
    </section>
  )
}