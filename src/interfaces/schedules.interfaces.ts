import { z } from 'zod'
import { createScheduleSchema, finalScheduleSchema, scheduleSchema } from '../schemas/schedules.schemas'

type iCreateSchedule = z.infer<typeof createScheduleSchema>
type iSchedule = z.infer<typeof scheduleSchema>
type iFinalSchedule = z.infer<typeof finalScheduleSchema>

export {
    iCreateSchedule,
    iSchedule,
    iFinalSchedule
}