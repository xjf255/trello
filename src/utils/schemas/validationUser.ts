import z, { object } from 'zod'
import { IUser, IUserSignUp } from '../../types'

const schemaUsers = object({
  "user": z.string().max(8,"El usuario debe tener un maximo de 8 caracteres").nullable(),
  "password": z.string().min(8,"La contraseña debe tener al menos 8 caracteres").regex(
    /^(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])/,
    "La cadena debe contener al menos un número y un carácter especial"
  ),
  "email": z.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    "Correo electrónico inválido")
})

export function validatedLoginUser(object:Partial<IUser>) {
  return schemaUsers.partial().safeParse(object)
}

export function validatedSignUpUser(object:IUserSignUp) {
  return schemaUsers.safeParse(object)
}