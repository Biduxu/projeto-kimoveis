import { Router } from 'express'
import { createLoginController } from '../controllers/login.controllers'
import validateDataMiddleware from '../middlewares/validateData.middleware'
import { createLoginSchema } from '../schemas/login.schemas'

const loginRoutes: Router = Router()

loginRoutes.post('', validateDataMiddleware(createLoginSchema), createLoginController)

export default loginRoutes