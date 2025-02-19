import { useEffect, useState } from "react"
import { ReturnArrow } from "../components/Icons"
import { DAYS, MONTHS } from "../utils/constant"
import "./Calendar.css"
import { useModal } from "../hooks/useModal"
import { useTaskActions } from "../hooks/useTaskActions"
import { IDate, TaskState } from "../types"

enum typeChangeMonth {
  next = "next",
  previous = "previous",
}

export default function Calendar() {
  const currentDate = new Date()
  const { getTasks, tasks: allTasks } = useTaskActions()
  const { changeModalState } = useModal()

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

  const [tasks, setTasks] = useState<TaskState[] | null>(getTasks(date.month, date.year) || null)

  // Update tasks when month or year changes
  useEffect(() => {
    setTasks(getTasks(date.month, date.year) || null)
  }, [date.month, date.year, allTasks])

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

  // Get the days of the month with proper alignment
  const days = [...Array(date.startsOn).fill(null), ...Array(date.daysOfMonth).keys()]
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
            <ReturnArrow />
          </i>
          <h2>
            {MONTHS[date.month]} {date.year}
          </h2>
          <i style={{ rotate: "180deg" }} onClick={() => changeMonth(typeChangeMonth.next)}>
            <ReturnArrow />
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

                  const taskIndex = tasks?.findIndex((el) => el.day === day + 1) // Fixing 0-based issue
                  const currentTask = taskIndex !== undefined && taskIndex !== -1 ? tasks![taskIndex] : null

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
                      {currentTask && <p className="calendar__task" style={{ background: `${currentTask.color}` }}>{currentTask.taskTitle}</p>}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
