import { useState } from "react"
import { Show, Warning } from "../../components/Icons"
import { validatedUser } from "../../utils/schemas/validationUser"
import { TypeOfInput } from "../../type"
import { toast } from "sonner"
import { useDebouncedCallback } from "use-debounce"

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
    const user = event.target.value
    if (user.trim() === '') {
      setIsEmpty(true)
      setError('')
      return
    }
    setIsEmpty(false)
    const isEmail = user.includes('@')
    const validateField = validatedUser({ [isEmail ? "email" : name]: user })
    if (!validateField.success) {
      const { message } = JSON.parse(validateField.error.message)[0]
      setError(message)
      return
    }
    setError('')
  }

  const debouncedInput = useDebouncedCallback((e) => handleChangeInput(e), 1000)

  const showPassword = () => setShow(!show)
  const showWarning = () => toast.warning(error)

  return (
    <label>
      {name}:
      <div>
        <input type={!show ? type : "text"} name={name} placeholder={placeholder} onChange={e => debouncedInput(e)} />
        {error && <i onClick={showWarning}><Warning /></i>}
        {(!isEmpty && type === "password") && <i onClick={showPassword}><Show /></i>}
      </div>
    </label>
  )
}