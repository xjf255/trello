import { useRef } from "react"
import { validatedUser } from "../../utils/schemas/validationUser"

export function ResetPassword() {
  const formRef = useRef<HTMLFormElement>(null)
  const handleClick = (e:React.MouseEvent) => {
    if (!formRef.current) return
    e.preventDefault()
    let response
    const $form = new FormData(formRef.current)
    const user = $form.get('user')
    if (!user) {
      console.error('no ingreso un valor')
      return
    }
    if (user.toString().length > 8 && user.toString().includes('@')) {
      response = validatedUser({ email: user.toString() })
    } else {
      response = validatedUser({ user: user.toString() })
    }
    console.log(response.data)
  }

  return (
    <form ref={formRef}>
      <label>
        <input name="user" type="text" placeholder="Enter your Email or User" />
      </label>
      <button onClick={handleClick}>send</button>
    </form>
  )
}