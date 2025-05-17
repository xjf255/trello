/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react"
import { validatedUser } from "../../utils/schemas/validationUser"
import { TypeOfInput } from "../../type"
import { toast } from "sonner"
import { useDebouncedCallback } from "use-debounce"
import { CircleAlert, Eye } from "lucide-react"

interface InputProps {
  name: string
  placeholder: string
  label?: string
  type?: TypeOfInput
}

export const Input = ({ name, label, placeholder, type = TypeOfInput.text }: InputProps) => {
  const [isEmpty, setIsEmpty] = useState(true)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const validateInput = (value: string) => {
    if (value.trim() === "") {
      setIsEmpty(true)
      setError("")
      return
    }

    setIsEmpty(false)

    const fieldKey = value.includes("@") ? "email" : name

    const validationResult = validatedUser({ [fieldKey]: value })
    console.log(validationResult)
    if (!validationResult.success) {
      try {
        const errorData = JSON.parse(validationResult.error.message)[0]
        setError(errorData.message)
      } catch (err) {
        setError("Invalid input")
      }
      return
    }

    setError("")
  }

  const debouncedValidation = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => validateInput(e.target.value), 500
  )

  const togglePasswordVisibility = () => setShowPassword(prev => !prev)

  const displayErrorToast = () => {
    if (error) {
      toast.warning(error)
    }
  }

  const inputType = type === TypeOfInput.password
    ? (showPassword ? "text" : "password")
    : type

  return (
    <div className="input-field">
      <label htmlFor={name}>
        <strong>{label}:</strong>
      </label>

      <div className="input__container">
        <input
          id={name}
          type={inputType}
          name={name}
          placeholder={placeholder}
          onChange={debouncedValidation}
          aria-invalid={!!error}
        />

        {error && (
          <i
            onClick={displayErrorToast}
            aria-label="Show validation error"
          >
            <CircleAlert size={18} />
          </i>
        )}

        {type === TypeOfInput.password && !isEmpty && (
          <i
            onClick={togglePasswordVisibility}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            <Eye size={18} />
          </i>
        )}
      </div>
    </div>
  )
}