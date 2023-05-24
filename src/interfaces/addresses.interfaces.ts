import { z } from 'zod'
import { addressSchema, createAddressSchema } from '../schemas/addresses.schemas'

type iCreateAddress = z.infer<typeof createAddressSchema>
type iAddress = z.infer<typeof addressSchema>

export {
    iCreateAddress,
    iAddress
}