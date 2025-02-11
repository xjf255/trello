import { useRef } from "react"
import { useUserActions } from "../hooks/useUserActions"
import { TypeOfInput } from "../type"
import { Input } from "../verification/components/Input"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { RequestError } from "../utils/customErrors/requestErrors"
import { IUpdateUser } from "../types"

export default function UserConfig() {
  const { user } = useUserActions()
  const formRef = useRef<HTMLFormElement>(null)
  const queryClient = useQueryClient()

  const updateUser = async (data: Partial<IUpdateUser>) => {
    const formData = new FormData()

    Object.entries(data).forEach(([key, value]) => {
      console.log(value)
      if (value instanceof File) {
        formData.append(key, value)
      } else {
        formData.append(key, value.toString())
      }
    })
    console.log(formData)

    const response = await fetch(`http://localhost:1234/users/${user?.id}`, {
      method: 'PUT',
      credentials: "include",
      body: formData,
    })

    if (!response.ok) throw new RequestError("Try again later")
    return response.json()
  }

  const mutationUser = useMutation({
    mutationFn: (data: Partial<IUpdateUser>) => updateUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
    onError: () => {
      queryClient.setQueryData(['user'], undefined)
      throw new RequestError("Try again later")
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] })
    }
  })

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (!formRef.current) return

    const formData = new FormData(formRef.current)
    const data: Partial<IUpdateUser> = {}

    if (formData.get("user")) data.user = formData.get("user")?.toString().trim()
    if (formData.get("email")) data.email = formData.get("email")?.toString().trim()
    if (formData.get("phone")) data.phone = formData.get("phone")?.toString().trim()

    const avatarFile = formData.get("avatar") as File
    if (avatarFile && avatarFile.size > 0) {
      data.avatar = avatarFile
    }

    if (formData.get("isActive") === "on") data.isActive = false

    const password = formData.get("password")?.toString()
    const verifyPassword = formData.get("verifyPassword")?.toString()

    if (password && verifyPassword && comparePassword(password, verifyPassword)) {
      data.password = password
    }
    console.log(data)
    mutationUser.mutate(data)
  }


  const comparePassword = (password: string, verifyPassword: string): boolean => {
    return password === verifyPassword
  }

  return (
    <section>
      <h2>Settings</h2>
      <div>
        <form ref={formRef} encType="multipart/form-data">
          <label>
            Avatar:
            <input type="file" name="avatar" accept="image/png, image/jpeg" />
          </label>
          <Input name="user" placeholder={user?.user ?? "Enter your new username"} />
          <Input name="email" placeholder={user?.email ?? "Enter your email address"} />
          <Input name="phone" placeholder={user?.phone?.slice(-2).padStart(8, "*") ?? "Enter your phone number"} type={TypeOfInput.number} />
          <Input name="password" placeholder="Enter your new password" type={TypeOfInput.password} />
          <Input name="verifyPassword" placeholder="Verify your new password" type={TypeOfInput.password} />
          <label>
            Deactivate Account:
            <input type="checkbox" name="isActive" />
          </label>
          <button onClick={handleClick}>Update Info</button>
        </form>
      </div>
    </section>
  )
}
