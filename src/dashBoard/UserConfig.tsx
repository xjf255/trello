import { useRef } from "react"
import { useUserActions } from "../hooks/useUserActions"
import { TypeOfInput } from "../type"
import { Input } from "../verification/components/Input"

export default function UserConfig() {
  const { user } = useUserActions()
  const formRef = useRef(null)

  const handleClick = () => {
    //get formData
    if (!formRef.current) return
    const formData = new FormData(formRef.current)
  }

  return (
    <section>
      <h2>Settings</h2>
      <div>
        <form encType="multipart/form-data" ref={formRef}>
          <label>
            avatar:
            <input type="file" name="avatar" accept="image/png, image/jpeg" />
          </label>
          <Input name="user" placeholder={user?.user ?? "Enter your new user"} />
          <Input name="email" placeholder={user?.email ?? "Enter your email address "} />
          <Input name="phone" placeholder={user?.phone.slice(-2).padStart(8, "*") ?? "Enter your name"} type={TypeOfInput.number} />
          <Input name="password" placeholder="Enter your new password" type={TypeOfInput.password} />
          <Input name="verify-password" placeholder="Verify your new password" type={TypeOfInput.password} />
          <label>
            desactivar cuenta:
            <input type="checkbox" name="" />
          </label>
          <button onClick={handleClick}>actualizar info...</button>
        </form>
      </div>
    </section>
  )
}