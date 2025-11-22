import { UserLockIcon, UserRoundPlus } from "lucide-react"
import "../styles/People.css"
import { ModalPeople } from "../components/ModalPeople"
import { useEffect, useMemo, useState } from "react"
import { useUserActions } from "../hooks/useUserActions"
import { useGetFriendshipsQuery, useGetFriendShipsRequestQuery } from "../context/people/friendlyAPI"
import { ItemUser } from "../components/ItemUser"
import { IPeopleState } from "../types"
import { Loader } from "../components/Loader"

export default function Peoples() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showLoader, setShowLoader] = useState(false) // loader suave
  const { user } = useUserActions()

  const {
    data: friendsFromApi,
    isLoading,
    isFetching,
  } = useGetFriendshipsQuery(user.id)

  const { data: requestsFriendShip, isLoading: isLoadingRequests } =
    useGetFriendShipsRequestQuery(user.id)

  console.log(requestsFriendShip, isLoadingRequests)

  const baseList: IPeopleState[] = useMemo(() => {
    if (!friendsFromApi) return []
    return Array.isArray(friendsFromApi)
      ? friendsFromApi
      : friendsFromApi.friends ?? []
  }, [friendsFromApi])

  const filteredPeople = useMemo(() => {
    if (!searchTerm.trim()) return baseList

    const term = searchTerm.toLowerCase()
    return baseList.filter((friend: IPeopleState) =>
      friend.user?.toLowerCase().includes(term) ||
      friend.email?.toLowerCase().includes(term)
    )
  }, [baseList, searchTerm])

  useEffect(() => {
    if (isLoading) {
      const id = setTimeout(() => {
        setShowLoader(true)
      }, 250)
      return () => clearTimeout(id)
    }

    setShowLoader(false)
  }, [isLoading])

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleOpenModal = () => setIsModalOpen(true)
  const handleCloseModal = () => setIsModalOpen(false)

  const isEmpty = !isLoading && filteredPeople.length === 0

  return (
    <section className="people">
      <div className="people__container">
        <header>
          <div>
            <h4>People</h4>
            <span>
              <button
                type="button"
                onClick={handleOpenModal}
                aria-label="Lock user"
              >
                <UserLockIcon size={18} />
              </button>
              <button
                type="button"
                onClick={handleOpenModal}
                aria-label="Add new person"
              >
                <UserRoundPlus size={18} />
              </button>
            </span>
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

        <div className="people__list-wrapper">
          {showLoader && baseList.length === 0 && (
            <div className="people__loader">
              <Loader />
            </div>
          )}

          {isFetching && baseList.length > 0 && (
            <div className="people__loader-overlay">
              <Loader />
            </div>
          )}

          {!showLoader && (
            <ul className="people__list fade-in">
              {isEmpty && <li>No friends found.</li>}

              {filteredPeople.map(friend => (
                <li key={friend.id} className="friendly-container">
                  <ItemUser {...friend} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}
