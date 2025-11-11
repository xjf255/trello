import { UserRoundPlus } from "lucide-react"
import "../styles/People.css"
import { ModalPeople } from "../components/ModalPeople"
import { useMemo, useState } from "react"
import { useUserActions } from "../hooks/useUserActions"
import { useGetFriendshipsQuery } from "../context/people/friendlyAPI"
import { ItemUser } from "../components/ItemUser"
import { IPeopleState } from "../types"

export default function Peoples() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { user } = useUserActions()
  const { data: friendsFromApi = [], isLoading } = useGetFriendshipsQuery(user.id)

  const filteredPeople = useMemo(() => {
    const list = Array.isArray(friendsFromApi) ? friendsFromApi : friendsFromApi?.friends ?? []

    if (!searchTerm.trim()) {
      return list
    }

    const term = searchTerm.toLowerCase()
    return list.filter((friend: IPeopleState) =>
      friend.user?.toLowerCase().includes(term) ||
      friend.email?.toLowerCase().includes(term)
    )
  }, [friendsFromApi, searchTerm])

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleOpenModal = () => setIsModalOpen(true)
  const handleCloseModal = () => setIsModalOpen(false)

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
        <form>
          <input
            type="text"
            id="search-user"
            placeholder="search user..."
            name="user-search"
            value={searchTerm}
            onChange={handleSearch}
          />
        </form>
        <ul>
          {isLoading && <li>Loading...</li>}
          {!isLoading && filteredPeople.length === 0 && <li>No friends found.</li>}
          {!isLoading &&
            filteredPeople.map(friend => (
              <li key={friend.id} className="friendly-container">
                <ItemUser {...friend} />
              </li>
            ))}
        </ul>
      </div>
    </section>
  )
}
