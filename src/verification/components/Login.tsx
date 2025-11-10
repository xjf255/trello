import { useRef, useState } from "react"
import { PATHS } from "../../utils/constant"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { RequestError } from "../../utils/customErrors/requestErrors"
import { ValidationError } from "../../utils/customErrors/validationErrors"
import { Input } from "./Input"
import { TypeOfInput } from "../../type.ts"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
import { Toggle } from "./Toggle.tsx"
import { GoogleIcon } from "./Icons.tsx"

interface LoginCredentials {
  user: string
  password: string
}

interface FormErrors {
  message?: string
  fields?: 'user' | 'pass' | '*'
}

export const Login = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const [formErrors, setFormErrors] = useState<FormErrors>({})
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const reactiveAccount = async () => {
    try {
      const response = await fetch('http://localhost:1234/users/reactive', {
        method: "POST",
        credentials: "include"
      })

      if (!response.ok) {
        throw new RequestError("Failed to reactivate user account")
      }

      return response.json()
    } catch (error) {
      toast.error("Account reactivation failed")
      throw error
    }
  }

  const loginUser = async ({ user, password }: LoginCredentials) => {
    const isEmail = user.includes("@")
    const loginPayload = {
      [isEmail ? "email" : "user"]: user,
      password
    }

    const response = await fetch('http://localhost:1234/verification/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: "include",
      body: JSON.stringify(loginPayload)
    })

    if (response.status === 401) {
      toast.warning("Inactive user account, reactivating...")
      await reactiveAccount()
      toast.success("Account reactivated. Please try logging in again.")
      return { success: true, needsRefresh: true }
    }

    if (!response.ok) {
      const errorData = await response.json()
      throw new RequestError(JSON.stringify(errorData))
    }

    return response.json()
  }

  const { mutate: login } = useMutation({
    mutationFn: ({ user, password }: LoginCredentials) => loginUser({ user, password }),
    onSuccess: (data) => {
      if (data.needsRefresh) {
        window.location.reload()
        return
      }

      queryClient.invalidateQueries({ queryKey: ['user'] })
      toast.success("Login successful!")
      navigate(PATHS.user.workerspace.dashboard)
    },
    onError: (error: Error) => {
      queryClient.setQueryData(['user'], undefined)
      try {
        const { message } = JSON.parse((error as RequestError).message)
        toast.error(message || "Login failed")
      } catch {
        toast.error("Authentication failed. Please try again.")
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] })
    }
  })

  const handleGoogleLogin = () => {
    toast.info("Google login not implemented yet")
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    try {
      if (!formRef.current) return

      const formData = new FormData(formRef.current)
      const user = formData.get('user')?.toString()
      const password = formData.get('password')?.toString()

      if (!user && !password) {
        throw new ValidationError("Username/email and password are required", '*')
      } else if (!user) {
        throw new ValidationError("Username or email is required", 'user')
      } else if (!password) {
        throw new ValidationError("Password is required", 'pass')
      }

      setFormErrors({})
      login({ user, password })
    } catch (error) {
      if (error instanceof ValidationError) {
        setFormErrors({
          message: error.message,
          fields: error.fields as FormErrors['fields']
        })
      } else if (error instanceof RequestError) {
        setFormErrors({ message: error.message })
      } else {
        toast.error("An unexpected error occurred")
      }
    }
  }

  const renderErrorMessage = (fieldType: FormErrors['fields']) => {
    if (formErrors.fields === fieldType && formErrors.message) {
      return <p className="isError">{formErrors.message}</p>
    }
    return null
  }

  return (
    <div className="login-container">
        <Toggle />
      <button
        className="login__google"
        onClick={handleGoogleLogin}
        type="button"
        style={{ marginBlock: "1rem" }}
      >
        <GoogleIcon />
        <p>Continue with Google</p>
      </button>

      <hr />

      <form ref={formRef} name="loginForm" onSubmit={handleSubmit}>
        <Input
          label="Username or Email"
          name="user"
          placeholder="e.g. username or email@example.com"
        />
        {renderErrorMessage('user')}

        <Input
          label="Password"
          name="password"
          placeholder="Enter your password"
          type={TypeOfInput.password}
        />

        <a
          className="form__forgotPassword"
          href={`http://localhost:5173${PATHS.verification.passwordReset}`}
        >
          Forgot password?
        </a>

        {renderErrorMessage('pass')}
        {renderErrorMessage('*')}

        <button type="submit">
          Continue
        </button>
      </form>
    </div>
  )
}