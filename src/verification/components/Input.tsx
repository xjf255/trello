import { useState } from "react"
import { Show, Warning } from "../../components/Icons"
import { validatedUser } from "../../utils/schemas/validationUser"

interface InputProps {
  name: string,
  placeholder: string,
  isPassword?: boolean
}

export const Input = ({ name, placeholder, isPassword = false }: InputProps) => {
  const [isEmpty, setIsEmpty] = useState<boolean>(true)
  const [error, setError] = useState<string>('')
  function handleChangeInput(event: React.ChangeEvent<HTMLInputElement>) {
    const user = event.currentTarget.value
    if (user.trim() !== '') setIsEmpty(false)
    const validateField = validatedUser({ user })
    if (!validateField.success) {
      const { message } = JSON.parse(validateField.error.message)[0]
      setError(message)
      console.log(message)
      return
    }
    setError('')
  }

  return (
    <label>
      {name}:
      <div>
        <input type={isPassword ? "password" : "text"} name={name} placeholder={placeholder} onChange={handleChangeInput} />
        {error && <Warning />}
        {(!isEmpty && isPassword) && <Show />}
      </div>
    </label>
  )
}