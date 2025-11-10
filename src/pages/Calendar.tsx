import { MouseEvent, useMemo, useState } from "react"
import { DAYS, MONTHS } from "../utils/constant"
import "../styles/Calendar.css"
import { useModal } from "../hooks/useModal"
import { useTaskActions } from "../hooks/useTaskActions"
import { IDate } from "../types"
import { Modal } from "../components/Modal"
import { ModalContext } from "../context/modal/sliceState"
import { ArrowLeft } from "lucide-react"

enum typeChangeMonth {
  next = "next",
  previous = "previous",
}

export default function Calendar() {
  const currentDate = new Date()
  const { getTasks, tasks: allTasks } = useTaskActions()
  const { changeModalState } = useModal(ModalContext)

  const [date, setDate] = useState<IDate>(() => {
    const month = currentDate.getMonth()
    const year = currentDate.getFullYear()
    return {
      day: currentDate.getDate(),
      month,
      year,
      daysOfMonth: new Date(year, month + 1, 0).getDate(),
      startsOn: new Date(year, month, 1).getDay(),
    }
  })

  const tasks = useMemo(() => {
    return getTasks(date.month, date.year) || null;
  }, [date.month, date.year, allTasks, getTasks]);

  const changeMonth = (type: typeChangeMonth) => {
    setDate((prev) => {
      const newMonth = type === typeChangeMonth.next ? (prev.month + 1) % 12 : (prev.month + 11) % 12
      const newYear =
        type === typeChangeMonth.next && prev.month === 11
          ? prev.year + 1
          : type === typeChangeMonth.previous && prev.month === 0
            ? prev.year - 1
            : prev.year

      return {
        ...prev,
        month: newMonth,
        year: newYear,
        daysOfMonth: new Date(newYear, newMonth + 1, 0).getDate(),
        startsOn: new Date(newYear, newMonth, 1).getDay(),
      }
    })
  }

  const handleClickDay = (day: number, year: number, month: number) => {
    localStorage.setItem("taskDate", JSON.stringify({ day, year, month }))
    changeModalState()
  }

  const updateTask = (e: MouseEvent<HTMLParagraphElement>, object: object) => {
    e.stopPropagation()
    localStorage.setItem("taskToUpdate", JSON.stringify(object))
    changeModalState()
  }

  // Get the days of the month with proper alignment
  const days = useMemo(() => [...Array(date.startsOn).fill(null), ...Array(date.daysOfMonth).keys()], [date.startsOn, date.daysOfMonth])
  const daysCalendar = days.reduce((rows, cur, index) => {
    if (index % 7 === 0) rows.push([])
    rows[rows.length - 1].push(cur)
    return rows
  }, [] as (number | null)[][])

  return (
    <section className="calendar">
      <div className="calendar__area">
        <header>
          <i onClick={() => changeMonth(typeChangeMonth.previous)}>
            <ArrowLeft />
          </i>
          <h2>
            {MONTHS[date.month]} {date.year}
          </h2>
          <i style={{ transform: "rotate(180deg)" }} onClick={() => changeMonth(typeChangeMonth.next)}>
            <ArrowLeft />
          </i>
        </header>
        <table>
          <thead>
            <tr>
              {DAYS.map((day) => (
                <td key={day}>{day}</td>
              ))}
            </tr>
          </thead>
          <tbody>
            {daysCalendar.map((week: [], i: number) => (
              <tr key={i}>
                {week.map((day, j) => {
                  const isToday =
                    day !== null &&
                    day + 1 === currentDate.getDate() &&
                    date.month === currentDate.getMonth() &&
                    date.year === currentDate.getFullYear()

                  const currentTask = tasks?.filter((el) => el.day === day + 1) ?? null
                  return (
                    <td key={j} onClick={() => day !== null && handleClickDay(day + 1, date.year, date.month)}>
                      {day !== null ? (
                        isToday ? (
                          <i className="today">
                            <strong>{day + 1}</strong>
                          </i>
                        ) : (
                          <strong>{day + 1}</strong>
                        )
                      ) : (
                        ""
                      )}
                      {currentTask !== null && currentTask.length > 0 && <ul>
                        {currentTask.length > 0 && currentTask?.map((task, index) => (
                          <li key={index}><p className="calendar__task" style={{ background: `${task.color}` }} onClick={(e) => updateTask(e, task)}>{task.taskTitle}</p></li>
                        ))}
                      </ul>}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal />
    </section>
  )
}
