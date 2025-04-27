import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { PATHS } from "../../utils/constant"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { IUserSignUp } from "../../types.ts"
import { Input } from "./Input"
import { TypeOfInput } from "../../type.ts"
import { toast } from "sonner"
import { Toggle } from "./Toggle.tsx"

interface FormErrors {
  message: string
  fields: string[]
}

export const SignUp = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const [formErrors, setFormErrors] = useState<FormErrors | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const createUser = async ({ user, password, email, phone }: IUserSignUp) => {
    try {
      const response = await fetch('http://localhost:1234/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify({ user, password, email, phone })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to create account")
      }

      return response.json()
    } catch (error) {
      console.error("Registration error:", error)
      throw error
    }
  }

  const { mutate: registerUser } = useMutation({
    mutationFn: createUser,
    onMutate: () => {
      setIsSubmitting(true)
    },
    onSuccess: () => {
      toast.success("Account created successfully!")
      queryClient.invalidateQueries({ queryKey: ['user'] })
      navigate(PATHS.user.workerspace.dashboard)
    },
    onError: (error: Error) => {
      queryClient.setQueryData(['user'], undefined)
      toast.error(error.message || "Failed to create account")
      setFormErrors({
        message: error.message,
        fields: []
      })
    },
    onSettled: () => {
      setIsSubmitting(false)
      queryClient.invalidateQueries({ queryKey: ["user"] })
    }
  })

  const validateForm = (formData: FormData): { isValid: boolean; missingFields: string[] } => {
    const requiredFields = ['user', 'password', 'email']
    const missingFields = requiredFields.filter(field => {
      const value = formData.get(field)?.toString().trim()
      return !value
    })

    return {
      isValid: missingFields.length === 0,
      missingFields
    }
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    if (!formRef.current) return

    const formData = new FormData(formRef.current)
    const { isValid, missingFields } = validateForm(formData)

    if (!isValid) {
      setFormErrors({
        message: "Please fill in all required fields",
        fields: missingFields
      })
      toast.error("Please fill in all required fields")
      return
    }

    const user = formData.get('user')?.toString() || ""
    const password = formData.get('password')?.toString() || ""
    const email = formData.get('email')?.toString() || ""
    const phone = formData.get('phone')?.toString() || ""

    setFormErrors(null)
    registerUser({ user, password, email, phone })
  }

  return (
    <div className="signup-container">
      <h2>Create an Account</h2>

      <form ref={formRef} onSubmit={handleSubmit} noValidate>
        <Input
          name="user"
          label="Username"
          placeholder="Enter your username"
        />

        <Input
          name="email"
          label="Email"
          placeholder="Enter your email address"
        />

        <Input
          name="phone"
          label="Phone Number"
          placeholder="Enter your phone number (optional)"
          type={TypeOfInput.number}
        />

        <Input
          name="password"
          label="Password"
          placeholder="Create a secure password"
          type={TypeOfInput.password}
        />

        {formErrors && (
          <div className="form-error">
            <p>{formErrors.message}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="signup-button"
        >
          {isSubmitting ? "Creating Account..." : "Sign Up"}
        </button>
      </form>

      <Toggle />
    </div>
  )
}