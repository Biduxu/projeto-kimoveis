import { z } from 'zod'
import { createLoginSchema } from '../schemas/login.schemas'

type iLogin = z.infer<typeof createLoginSchema>

export {
    iLogin
}