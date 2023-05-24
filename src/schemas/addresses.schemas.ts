import { number, z } from 'zod'

const createAddressSchema = z.object({
    street: z.string().max(45),
    zipCode: z.string().max(8),
    number: z.string().max(7).nullish(),
    city: z.string().max(20),
    state: z.string().max(2)
})

const addressSchema = createAddressSchema.extend({
    id: z.number()
})

export {
    createAddressSchema,
    addressSchema
}