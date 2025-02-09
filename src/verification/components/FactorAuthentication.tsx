import { useEffect, useRef, useState } from "react"
import { useLocation } from "react-router-dom"
import { Input } from "./Input"
import { TypeOfInput } from "../../type"
import { RequestError } from "../../utils/customErrors/requestErrors"
import { toast } from "sonner"

export default function FactorAuthentication() {
  const location = useLocation()
  const formRef = useRef(null)
  const [timer, setTime] = useState({ min: 5, sec: 0 })

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (!formRef.current) return

    const formData = new FormData(formRef.current)
    const code = formData.get("code")?.toString().trim()

    if (!code) {
      toast.error("Ingrese un código válido")
      return
    }

    try {
      const response = await fetch("http://localhost:1234/users/verify-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ code }),
      })

      const data = await response.json()
      if (!response.ok) throw new RequestError(data.message)

      toast.success(data.message)
    } catch (error) {
      console.error("Error verificando código:", error)
      toast.error(`${error}`)
    }
  }

  const sendURL = async (token: string) => {
    try {
      const response = await fetch(`http://localhost:1234/users/auth/${token}`,)
      const data = await response.json()
      console.log(data)
      if (!response.ok) throw new RequestError(data.message)
      return data
    } catch (error) {
      console.error("Error resetting login:", error)
      throw error
    }
  }

  useEffect(() => {
    (async () => {
      const tokenParam = new URLSearchParams(location.search).get('token')
      if (!tokenParam) {
        toast.error("No se pudo obtener la URL")
        return
      }
      try {
        const sendToken = await sendURL(tokenParam)
        toast.success(sendToken.message)
      } catch (error) {
        toast.error(`${error}`)
      }
    })()
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
        <Input name="code" placeholder="Enter your code" type={TypeOfInput.number} />
        <button onClick={handleClick}>send</button>
      </form>

      <p>
        We have sent you a code, check your messages. The code is valid for{" "}
        <b className="timer">
          {timer.min}:{timer.sec.toString().padStart(2, "0")}
        </b>{" "} minutes.
      </p>
    </div>
  )
}