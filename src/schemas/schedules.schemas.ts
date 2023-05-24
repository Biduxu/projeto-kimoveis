import { z } from 'zod'
import { returnRealEstateWithoutNumberAddressSchema } from './realEstate.schemas'
import { userSchema } from './users.schemas'

const createScheduleSchema = z.object({
    date: z.string(),
    hour: z.string(),
    realEstateId: z.number()
})

const scheduleSchema = createScheduleSchema.extend({
    user: z.number()
})

const finalScheduleSchema = scheduleSchema.omit({
    realEstateId: true,
    user: true
}).extend({
    realEstate: returnRealEstateWithoutNumberAddressSchema.omit({
        category: true
    }),
    user: userSchema.omit({
        deletedAt: true
    })
})

export {
    createScheduleSchema,
    scheduleSchema,
    finalScheduleSchema
}