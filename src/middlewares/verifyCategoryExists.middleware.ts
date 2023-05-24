import { Request, Response, NextFunction } from 'express'
import { Repository } from 'typeorm'
import { AppDataSource } from '../data-source'
import { Category } from '../entities'
import { AppError } from '../errors'

const verifyCategoryExistsMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

    let categoryId: number

    if(req.params.id || req.body.category){
        if(req.params.id){
            categoryId = parseInt(req.params.id)
        }else{
            categoryId = req.body.category
        }

        const categoriesRepository: Repository<Category> = AppDataSource.getRepository(Category)

        const findCategory: Category | null = await categoriesRepository.findOne({
            where: {
                id: categoryId
            }
        })

        if(!findCategory){
            throw new AppError('Category not found', 404)
        }

        return next()

    }

    return next()

}

export default verifyCategoryExistsMiddleware