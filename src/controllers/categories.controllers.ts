import { Request, Response } from 'express'
import { Category, RealEstate } from '../entities'
import { iAllCategories, iCategory, iCreateCategory } from '../interfaces/categories.interfaces'
import createCategoryService from '../services/categories/createCategory.service'
import listCategoriesService from '../services/categories/listCategories.service'
import listRealEstateByCategoryService from '../services/categories/listRealEstateByCategory.service'

const createCategoryController = async (req: Request, res: Response): Promise<Response> => {

    const categoryData: iCreateCategory = req.body

    const newCategory: iCategory = await createCategoryService(categoryData)

    return res.status(201).json(newCategory)

}

const listCategoriesController = async (req: Request, res: Response): Promise<Response> => {

    const categories: iAllCategories = await listCategoriesService()

    return res.json(categories)
}

const listRealEstateByCategoryController = async (req: Request, res: Response): Promise<Response> => {

    const categoryId: number = parseInt(req.params.id)

    const realEstateByCategory: Category | null = await listRealEstateByCategoryService(categoryId)

    return res.json(realEstateByCategory)
}

export {
    createCategoryController,
    listCategoriesController,
    listRealEstateByCategoryController
}