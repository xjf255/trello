import { useRef, useState } from "react"
import { PATHS } from "../../utils/constant"
import { useNavigate } from "react-router-dom"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { RequestError } from "../../utils/customErrors/requestErrors"
import { ValidationError } from "../../utils/customErrors/validationErrors"
import { Input } from "./Input"
import { Toggle } from "./Toggle"
import { IUser } from "../../types.ts"
import { TypeOfInput } from "../../type.ts"
import { toast } from "sonner"

interface IErrorsForm {
  message?: string
  fields?: string
}

export const Login = () => {
  const formRef = useRef(null)
  const [errorsForm, setErrorsForm] = useState<IErrorsForm>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const reactiveAccount = async () => {
    const response = await fetch('http://localhost:1234/users/reactive', {
      method: "POST",
      credentials: "include"
    })
    if (!response.ok) throw new RequestError("Not Found User")
    return response.json()
  }

  const loginUser = async ({ user, password }: IUser) => {
    const response = await fetch('http://localhost:1234/verification/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: "include",
      body: JSON.stringify({
        [user.includes("@") ? "email" : "user"]: user,
        password
      })
    })
    if (response.status === 401) {
      toast.warning("Usuario inactivo, activando cuenta...")
      await reactiveAccount()
      toast.success("Cuenta activada. Iniciando sesión...")
      location.reload()
    }

    if (!response.ok) throw new RequestError(JSON.stringify(await response.json()))
    return response.json()
  }

  const mutationUser = useMutation({
    mutationFn: ({ password, user }: { password: string, user: string }) => loginUser({ password, user }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
      navigate(PATHS.user.workerspace.dashboard)
    },
    onError: (e) => {
      queryClient.setQueryData(['user'], undefined)
      const { message } = JSON.parse(e.message)
      toast.error(message)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] })
    }
  })

  function handleSubmit(event: React.MouseEvent) {
    event.preventDefault()
    try {
      if (!formRef.current) return

      const formData = new FormData(formRef.current)
      const user = formData.get('user')?.toString()
      const password = formData.get('password')?.toString()
      const requiredFields = !user && !password ? '*' : !user ? 'user' : 'pass'

      if (!password || !user) throw new ValidationError("all fields are neccesary", requiredFields)
      setErrorsForm({})
      mutationUser.mutate({ user, password })
    } catch (error) {
      if (error instanceof ValidationError) {
        setErrorsForm({ message: error.message, fields: error.fields })
      }
      if (error instanceof RequestError) {
        setErrorsForm({ message: error.message })
      }
    }
  }

  return (
    <>
      <Toggle />
      <form ref={formRef} name="loginForm">
        <Input name={'user'} placeholder={"username or email"} />
        {errorsForm?.fields === 'user' && <p className="isError">{errorsForm.message}</p>}
        <Input name="password" placeholder="password" type={TypeOfInput.password} />
        {errorsForm?.fields === 'pass' && <p className="isError">{errorsForm.message}</p>}
        <input type="button" value="Iniciar Sesion" onClick={(e) => handleSubmit(e)} />
        {errorsForm?.fields === '*' && <p className="isError">{errorsForm.message}</p>}
      </form>
      <a href={`http://localhost:5173${PATHS.verification.passwordReset}`}>forgot password?</a>
    </>
  )
}