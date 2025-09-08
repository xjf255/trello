import z from 'zod'
import { IUserSignUp } from '../../types'

const schemaUsers = z.object({
  user: z.string()
    .min(3, "El usuario debe tener al menos 3 caracteres")
    .max(20, "El usuario puede tener un máximo de 20 caracteres")
    .regex(/^[a-zA-Z0-9_@]+$/, "El usuario solo puede contener letras, números y guiones bajos"),
    
  password: z.string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .max(128, "La contraseña no puede exceder 128 caracteres")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])/,
      "La contraseña debe contener al menos: una minúscula, una mayúscula, un número y un carácter especial"
    ),
    
  email: z.string()
    .email("Formato de correo electrónico inválido")
    .max(254, "El correo electrónico es demasiado largo")
})

export function validatedUser(object:Partial<IUserSignUp>) {
  return schemaUsers.partial().safeParse(object)
}

export function validatedSignUpUser(object:IUserSignUp) {
  return schemaUsers.safeParse(object)
}