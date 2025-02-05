import { useState } from "react"
import { Show, Warning } from "../../components/Icons"
import { validatedUser } from "../../utils/schemas/validationUser"
import { TypeOfInput } from "../../type"

interface InputProps {
  name: string,
  placeholder: string,
  type?: TypeOfInput
}

export const Input = ({ name, placeholder, type = TypeOfInput.text }: InputProps) => {
  const [isEmpty, setIsEmpty] = useState<boolean>(true)
  const [error, setError] = useState<string>('')
  const [show, setShow] = useState<boolean>(false)
  function handleChangeInput(event: React.ChangeEvent<HTMLInputElement>) {
    const user = event.currentTarget.value
    if (user.trim() === '') {
      setIsEmpty(true)
      setError('')
      return
    }
    setIsEmpty(false)
    console.log(user)
    const isEmail = user.includes('@')
    const validateField = validatedUser({ [isEmail ? "email" : name]: user })
    if (!validateField.success) {
      const { message } = JSON.parse(validateField.error.message)[0]
      setError(message)
      console.log(message)
      return
    }
    setError('')
  }

  const showPassword = () => {
    setShow(!show)
  }

  return (
    <label>
      {name}:
      <div>
        <input type={!show ? type : "text"} name={name} placeholder={placeholder} onChange={handleChangeInput} />
        {error && <Warning />}
        {(!isEmpty && type === "password") && <i onClick={showPassword}><Show /></i>}
      </div>
    </label>
  )
}