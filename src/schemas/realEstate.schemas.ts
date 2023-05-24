import { z } from 'zod'
import { addressSchema, createAddressSchema } from './addresses.schemas'
import { categorySchema } from './categories.schema'

const createRealEstateSchema = z.object({
    value: z.number().or(z.string()),
    size: z.number().positive(),
    address: createAddressSchema,
    category: z.number().nullish()
})

const createRealEstateFullSchema = createRealEstateSchema.omit({
    address: true
}).extend({
    address: z.number(),
    sold: z.boolean().default(false)
})

const returnRealEstateSchema = createRealEstateFullSchema.omit({
    address: true,
    category: true
}).extend({
    id: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
    address: addressSchema,
    category: categorySchema.nullish()
})

const returnRealEstateWithoutNumberAddressSchema = returnRealEstateSchema.omit({
    sold: true,
    address: true
})

const returnAllRealEstateSchema = returnRealEstateSchema.omit({
    category: true
}).array()

export {
    createRealEstateSchema,
    returnRealEstateSchema,
    createRealEstateFullSchema,
    returnRealEstateWithoutNumberAddressSchema,
    returnAllRealEstateSchema
}