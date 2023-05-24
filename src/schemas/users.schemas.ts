import { z } from 'zod'

const createUserSchema = z.object({
    name: z.string().max(45).min(3),
    email: z.string().email().max(120),
    admin: z.boolean().default(false),
    password: z.string().min(3).max(120)
})

const userSchema = createUserSchema.extend({
    id: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.string().nullish()
})

const returnUserSchema = userSchema.omit({
    password: true
})

const allUsersSchema = returnUserSchema.array()

const updateUserSchema = createUserSchema.partial().omit({
    admin: true
})

export {
    createUserSchema,
    userSchema,
    returnUserSchema,
    allUsersSchema,
    updateUserSchema
}