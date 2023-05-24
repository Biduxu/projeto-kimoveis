import { z } from 'zod'
import { allCategoriesSchema, categorySchema, createCategorySchema } from '../schemas/categories.schema'

type iCreateCategory = z.infer<typeof createCategorySchema>
type iCategory = z.infer<typeof categorySchema>
type iAllCategories = z.infer<typeof allCategoriesSchema>

export {
    iCategory,
    iCreateCategory,
    iAllCategories
}