import { useEffect, useRef, useState } from "react"
import { useLocation } from "react-router-dom"

export default function FactorAuthentication() {
  const location = useLocation()
  const formRef = useRef(null)
  const [timer, setTime] = useState({ min: 5, sec: 0 })
  const handleClick = () => {
    //todo
  }

  useEffect(() => {
    const tokenParam = new URLSearchParams(location.search).get('token')
    console.log(tokenParam)
  }, [location.search])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((prevTime) => {
        const { min, sec } = prevTime
        if (min === 0 && sec === 0) {
          clearInterval(intervalId)
          return prevTime 
        }

        return sec === 0
          ? { min: min - 1, sec: 59 }
          : { min, sec: sec - 1 }
      })
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return (
    <div>
      <form ref={formRef}>
        <label>
          <input name="code" type="number" placeholder="Enter your code" />
        </label>
        <button onClick={handleClick}>send</button>
      </form>

      <p>
        We have sent you a code, check your messages, the code is valid for 
        <p className="timer">
          {timer.min}:{timer.sec.toString().padStart(2, "0")}
        </p>{" "} minutes
      </p>
    </div>
  )
}