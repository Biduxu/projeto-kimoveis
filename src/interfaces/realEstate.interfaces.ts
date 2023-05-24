import { z } from 'zod'
import { createRealEstateFullSchema, createRealEstateSchema, returnAllRealEstateSchema, returnRealEstateSchema, returnRealEstateWithoutNumberAddressSchema } from '../schemas/realEstate.schemas'

type iCreateRealEstate = z.infer<typeof createRealEstateSchema>
type iCreateFullRealEstate = z.infer<typeof createRealEstateFullSchema>
type iRealEstate = z.infer<typeof returnRealEstateSchema>
type iRealEstateWithoutAddress = z.infer<typeof returnRealEstateWithoutNumberAddressSchema>
type iAllRealEstate = z.infer<typeof returnAllRealEstateSchema>

export {
    iCreateRealEstate,
    iRealEstate,
    iCreateFullRealEstate,
    iRealEstateWithoutAddress,
    iAllRealEstate
}