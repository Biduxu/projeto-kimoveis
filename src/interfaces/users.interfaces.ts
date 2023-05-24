import { DeepPartial } from 'typeorm'
import { z } from 'zod'
import { allUsersSchema, createUserSchema, returnUserSchema, userSchema } from '../schemas/users.schemas'

type iCreateUser = z.infer<typeof createUserSchema>
type iUser = z.infer<typeof userSchema>
type iUserWithoutPassword = z.infer<typeof returnUserSchema>
type iAllUsers = z.infer<typeof allUsersSchema>
type iUpdateUserPartial = DeepPartial<iCreateUser>

export {
    iCreateUser,
    iUser,
    iUserWithoutPassword,
    iAllUsers,
    iUpdateUserPartial
}