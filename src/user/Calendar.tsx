import { useEffect, useState } from "react";
import { ReturnArrow } from "../components/Icons";
import { DAYS, MONTHS } from "../utils/constant";
import "./Calendar.css"
import { useModal } from "../hooks/useModal";

enum typeChangeMonth {
  next = "next",
  previous = "previous"
}
interface IDate {
  day: number,
  daysOfMonth: number,
  month: number,
  year: number,
  startsOn: number
}

export default function Calendar() {
  const currentDate = new Date()
  const { changeModalState } = useModal()
  const [date, setDate] = useState<IDate>({
    day: currentDate.getDate(),
    month: currentDate.getMonth(),
    year: currentDate.getFullYear(),
    daysOfMonth: 30,
    startsOn: 1
  })

  const changeMonth = (type: typeChangeMonth) => {
    if (type === typeChangeMonth.next) {
      setDate({ ...date, month: date.month === 11 ? 0 : date.month + 1, year: date.month === 11 ? date.year + 1 : date.year })
      return
    }
    setDate({ ...date, month: date.month === 0 ? 11 : date.month - 1, year: date.month === 0 ? date.year - 1 : date.year })
  }

  const handleClickDay = (day: number) => {
    changeModalState()
    // alert(day)
  }
  useEffect(() => {
    setDate((prev) => ({
      ...prev,
      daysOfMonth: new Date(prev.year, prev.month + 1, 0).getDate(),
      startsOn: new Date(prev.year, prev.month, 1).getDay(),
    }));
  }, [date.month, date.year]);

  const days = [...Array(date.startsOn).fill(null), ...Array(date.daysOfMonth).keys()];
  const daysCalendar = days.reduce((rows, cur, index) => {
    if (index % 7 === 0) rows.push([]);
    rows[rows.length - 1].push(cur);
    return rows;
  }, [] as (number | null)[][]);

  return (
    <section className="calendar">
      <div className="calendar__area">
        <header>
          <i onClick={() => changeMonth(typeChangeMonth.previous)}><ReturnArrow /></i>
          <h2>{MONTHS[date.month]} {date.year}</h2>
          <i style={{ rotate: "180deg" }} onClick={() => changeMonth(typeChangeMonth.next)}><ReturnArrow /></i>
        </header>
        <table>
          <thead>
            <tr>
              {DAYS.map(day => {
                return (
                  <td key={day}>
                    {day}
                  </td>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {daysCalendar.map((week: number[], i: number) => {
              return (
                <tr key={i}>
                  {week.map((day: number, j: number) => {
                    return (
                      <td key={j} onClick={() => handleClickDay(day + 1)}>
                        {day !== null
                          ? day === date.day
                            ? <i className="today"><strong>{day + 1}</strong></i> : <strong>{day + 1}</strong>
                          : ""}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}