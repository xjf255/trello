import { UserRoundPlus } from "lucide-react"
import "../styles/People.css"
import { ModalPeople } from "../components/ModalPeople"
import { useState } from "react"
import { useUserActions } from "../hooks/useUserActions"
import { useGetFriendshipsQuery } from "../context/people/friendlyAPI"
import { ItemUser } from "../components/ItemUser"

export default function Peoples() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { user } = useUserActions()
  const { data, isLoading } = useGetFriendshipsQuery(user.id)
  console.log({ data, isLoading })

  // const filteredPeople = useMemo(() => {
  //   if (!searchTerm.trim()) {
  //     return allPeople
  //   }
  //   return filterPeople(searchTerm)
  // }, [allPeople, searchTerm, filterPeople])

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
          {isLoading && <li>Loading...</li>}
          {!isLoading && data?.friends?.length === 0 && <li>No friends found.</li>}
          {!isLoading &&
            data?.friends?.map(friend => (
              <li key={friend.id} className="friendly-container">
                <ItemUser {...friend} />
              </li>
            ))}
        </ul>
      </div>
    </section>
  )
}
