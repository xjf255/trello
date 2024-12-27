import { useRef } from "react"
import { PATHS } from "../../utils/constant"
import { redirect } from "react-router"

export const Login = () => {
  const formRef = useRef(null)

  function handleSubmit(event: React.MouseEvent) {
    event.preventDefault()
    if (!formRef.current) return

    const formData = new FormData(formRef.current)
    const user = formData.get('user')
    const password = formData.get('password')

    if (!password || !user) return

    fetch('http://localhost:1234/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: "include",
      body: JSON.stringify({ user, password })
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.json())
        }
        return response.json()
      })
      .then((data) => {
        console.log('Login successful:', data)
        redirect(PATHS.dashboard)
      })
      .catch((error) => {
        console.error('There was a problem with the login request:', error)
      })
  }

  return (
    <form ref={formRef}>
      <label>
        username:
        <input type="text" name="user" placeholder="username or email" />
      </label>
      <label>
        password:
        <input type="password" name="password" placeholder="password" />
      </label>
      <input type="button" value="Iniciar Sesion" onClick={(e) => handleSubmit(e)} />
    </form>
  )
}