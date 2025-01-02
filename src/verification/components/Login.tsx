import { useRef } from "react"
import { PATHS } from "../../utils/constant"
import { useNavigate } from "react-router"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { IUser } from "../../types"

export const Login = () => {
  const formRef = useRef(null)
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const loginUser = async ({ user, password }: IUser) => {
    const response = await fetch('http://localhost:1234/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: "include",
      body: JSON.stringify({ user, password })
    })
    return response.json()
  }

  const mutationUser = useMutation({
    mutationFn: ({ password, user }: { password: string, user: string }) => loginUser({ password, user }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
      navigate(PATHS.dashboard)
    },
    onError: () => {
      queryClient.setQueryData(['user'], undefined)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    }
  })

  function handleSubmit(event: React.MouseEvent) {
    event.preventDefault()
    if (!formRef.current) return

    const formData = new FormData(formRef.current)
    const user = formData.get('user')?.toString()
    const password = formData.get('password')?.toString()

    if (!password || !user) return

    mutationUser.mutate({ user, password })
  }

  return (
    <form ref={formRef}>
      <label>
        username:
        <input type="text" name="user" placeholder="username or email" />
      </label>
      <label>
        password:
        <input type="password" name="password" placeholder="password" />
      </label>
      <input type="button" value="Iniciar Sesion" onClick={(e) => handleSubmit(e)} />
    </form>
  )
}