import { useRef } from "react"
import { useNavigate } from "react-router";
import { PATHS } from "../../utils/constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IUserSignUp } from "../../types";

export const SignUp = () => {
  const formRef = useRef(null)
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const createUser = async ({ user, password, email }: IUserSignUp) => {
    const response = await fetch('http://localhost:1234/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: "include",
      body: JSON.stringify({ user, password, email })
    })
    return response.json()
  }

  const mutationUser = useMutation({
    mutationFn: ({ password, user, email }: IUserSignUp) => createUser({ password, user, email }),
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


  async function handleSubmit(event: React.MouseEvent) {
    event.preventDefault();

    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const user = formData.get('user')?.toString();
    const password = formData.get('password')?.toString();
    const email = formData.get('email')?.toString();

    if (!user || !password || !email) {
      console.error("Todos los campos son obligatorios");
      return;
    }

    mutationUser.mutate({ user, password, email });
  }


  return (
    <form ref={formRef}>
      <label>
        username:
        <input type="text" name="user" placeholder="user" />
      </label>
      <label>
        email:
        <input type="text" name="email" placeholder="email" />
      </label>
      <label>
        password:
        <input type="password" name="password" placeholder="password" />
      </label>
      <input type="button" value="Registrarse" onClick={handleSubmit} />
    </form>
  )
}