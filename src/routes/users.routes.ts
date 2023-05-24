import { Router } from 'express'
import { createUserController, deleteUserController, listUsersController, updateUserController } from '../controllers/users.controllers'
import verifyEmailExistsMiddleware from '../middlewares/verifyEmailExists.middleware'
import verifyTokenIsValidMiddleware from '../middlewares/verifyTokenIsValid.middleware'
import verifyUserExists from '../middlewares/verifyUserExists.middleware'
import verifyUserIsAdminMiddleware from '../middlewares/verifyUserIsAdmin.middleware'
import { createUserSchema, updateUserSchema } from '../schemas/users.schemas'
import validateDataMiddleware from './../middlewares/validateData.middleware'

const usersRoutes: Router = Router()

usersRoutes.post('', validateDataMiddleware(createUserSchema), verifyEmailExistsMiddleware, createUserController)
usersRoutes.get('', verifyTokenIsValidMiddleware, verifyUserIsAdminMiddleware, listUsersController)
usersRoutes.patch(
    '/:id', 
    verifyTokenIsValidMiddleware, 
    validateDataMiddleware(updateUserSchema),
    verifyUserExists, 
    verifyEmailExistsMiddleware, 
    verifyUserIsAdminMiddleware,
    updateUserController
)
usersRoutes.delete(
    '/:id', 
    verifyTokenIsValidMiddleware, 
    verifyUserExists, 
    verifyUserIsAdminMiddleware, 
    deleteUserController
)

export default usersRoutes