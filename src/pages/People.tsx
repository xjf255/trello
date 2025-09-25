import { UserRoundPlus } from "lucide-react"
import "../styles/People.css"
// import { usePeopleActions } from "../hooks/usePeopleActions"
// import { PeopleSection } from "../components/PeopleSection"
import { ModalPeople } from "../components/ModalPeople"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { fetchFriendships } from "../context/people/sliceFriendship"
import { unwrapResult } from "@reduxjs/toolkit"
import { useUserActions } from "../hooks/useUserActions"

export default function Peoples() {
  // const { people: allPeople, filterPeople } = usePeopleActions()
  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const dispatch = useDispatch()
  const { user } = useUserActions()

  const onClick = async () => {
    try {
      const resultAction = await dispatch(fetchFriendships(user.id))
      const originalPromiseResult = unwrapResult(resultAction)
      console.log('Result: ', originalPromiseResult)
      // handle result here
    } catch (rejectedValueOrSerializedError) {
      console.log('Failed to fetch friendships: ', rejectedValueOrSerializedError)
    }
  }

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
          <button onClick={onClick}>Fetch Friendships</button>
          {/* <PeopleSection people={filteredPeople} /> */}
        </ul>
      </div>
    </section>
  )
}
