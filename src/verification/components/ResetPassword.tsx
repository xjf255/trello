import { useRef } from "react"
import { validatedUser } from "../../utils/schemas/validationUser"
import { Input } from "./Input"
import { RequestError } from "../../utils/customErrors/requestErrors"
import { toast } from "sonner"

export function ResetPassword() {
  const formRef = useRef<HTMLFormElement>(null)

  const resetLoginUser = async (userData: { user?: string, email?: string }) => {
    try {
      const response = await fetch("http://localhost:1234/users/resetLogin", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify(userData),
      })

      const data = await response.json()
      if (!response.ok) throw new RequestError(data.message)

      return data
    } catch (error) {
      console.error("Error resetting login:", error)
      throw error
    }
  }

  const handleClick = async (e: React.MouseEvent) => {
    if (!formRef.current) return
    e.preventDefault()
    const $form = new FormData(formRef.current)
    const user = $form.get('user')?.toString().trim()
    if (!user) {
      return
    }
    const isEmail = user.includes("@")
    const response = validatedUser({ [isEmail ? "email" : "user"]: user })
    if (response.success) {
      try {
        const userData = { [isEmail ? "email" : "user"]: isEmail ? response.data.password : response.data.user }
        const resetLogin = await resetLoginUser(userData)
        toast.success(resetLogin.message)
      } catch (error) {
        toast.error(`${error}`)
      }
    }
  }

  return (
    <form ref={formRef}>
      <Input name="user" placeholder="Enter your Email or User" />
      <button onClick={handleClick}>send</button>
    </form>
  )
}