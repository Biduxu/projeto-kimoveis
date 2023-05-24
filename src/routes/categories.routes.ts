import { Router } from 'express'
import { createCategoryController, listCategoriesController, listRealEstateByCategoryController } from '../controllers/categories.controllers'
import validateDataMiddleware from '../middlewares/validateData.middleware'
import verifyCategoryExistsMiddleware from '../middlewares/verifyCategoryExists.middleware'
import verifyTokenIsValidMiddleware from '../middlewares/verifyTokenIsValid.middleware'
import verifyUserIsAdminMiddleware from '../middlewares/verifyUserIsAdmin.middleware'
import { createCategorySchema } from '../schemas/categories.schema'

const categoriesRoutes: Router = Router()

categoriesRoutes.post('', 
    verifyTokenIsValidMiddleware, 
    verifyUserIsAdminMiddleware, 
    validateDataMiddleware(createCategorySchema), 
    createCategoryController
)
categoriesRoutes.get('', 
    listCategoriesController
)
categoriesRoutes.get(
    '/:id/realEstate',
    verifyCategoryExistsMiddleware,
    listRealEstateByCategoryController
)

export default categoriesRoutes