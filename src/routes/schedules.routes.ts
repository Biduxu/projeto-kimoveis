import { Router } from 'express'
import { createScheduleController, listSchedulesByRealEstateController } from '../controllers/schedules.controllers'
import validateDataMiddleware from '../middlewares/validateData.middleware'
import verifyTokenIsValidMiddleware from '../middlewares/verifyTokenIsValid.middleware'
import verifyUserIsAdminMiddleware from '../middlewares/verifyUserIsAdmin.middleware'
import { createScheduleSchema } from '../schemas/schedules.schemas'

const schedulesRoutes: Router = Router()

schedulesRoutes.post('', verifyTokenIsValidMiddleware, validateDataMiddleware(createScheduleSchema), createScheduleController)
schedulesRoutes.get('/realEstate/:id', verifyTokenIsValidMiddleware, verifyUserIsAdminMiddleware, listSchedulesByRealEstateController)

export default schedulesRoutes