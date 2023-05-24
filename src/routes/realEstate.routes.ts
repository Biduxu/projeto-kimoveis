import { Router } from 'express'
import { createRealEstateController, listAllRealEstateController } from '../controllers/realEstate.controllers'
import validateDataMiddleware from '../middlewares/validateData.middleware'
import verifyCategoryExistsMiddleware from '../middlewares/verifyCategoryExists.middleware'
import verifyTokenIsValidMiddleware from '../middlewares/verifyTokenIsValid.middleware'
import verifyUserIsAdminMiddleware from '../middlewares/verifyUserIsAdmin.middleware'
import { createRealEstateSchema } from '../schemas/realEstate.schemas'

const realEstateRoutes: Router = Router()

realEstateRoutes.post('', 
    verifyTokenIsValidMiddleware, 
    verifyUserIsAdminMiddleware, 
    validateDataMiddleware(createRealEstateSchema),
    verifyCategoryExistsMiddleware, 
    createRealEstateController
)
realEstateRoutes.get('',
    listAllRealEstateController    
)

export default realEstateRoutes