import { useRef } from "react"
import { useNavigate } from "react-router"
import { PATHS } from "../../utils/constant"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { IUserSignUp } from "../../types.ts"
import { Toggle } from "./Toggle"
import { Input } from "./Input"
import { TypeOfInput } from "../../type.ts"

export const SignUp = () => {
  const formRef = useRef(null)
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const createUser = async ({ user, password, email, phone }: IUserSignUp) => {
    const response = await fetch('http://localhost:1234/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: "include",
      body: JSON.stringify({ user, password, email, phone })
    })
    return response.json()
  }

  const mutationUser = useMutation({
    mutationFn: ({ password, user, email, phone }: IUserSignUp) => createUser({ password, user, email, phone }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
      navigate(PATHS.user.dashboard)
    },
    onError: () => {
      queryClient.setQueryData(['user'], undefined)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] })
    }
  })


  async function handleSubmit(event: React.MouseEvent) {
    event.preventDefault()

    if (!formRef.current) return

    const formData = new FormData(formRef.current)
    const user = formData.get('user')?.toString()
    const password = formData.get('password')?.toString()
    const email = formData.get('email')?.toString()
    const phone = formData.get('phone')?.toString()

    if (!user || !password || !email) {
      console.error("Todos los campos son obligatorios")
      return
    }

    mutationUser.mutate({ user, password, email, phone })
  }


  return (
    <>
      <Toggle />
      <form ref={formRef}>
        <Input name="user" placeholder="ingresa tu usuario..." />
        <Input name="email" placeholder="ingresa tu email..." />
        <Input name="phone" placeholder="ingresa tu numero de telefono..." type={TypeOfInput.number} />
        <Input name="password" placeholder="ingresa tu contraseña..." type={TypeOfInput.password} />
        <input type="button" value="Registrarse" onClick={handleSubmit} />
      </form>
    </>
  )
}