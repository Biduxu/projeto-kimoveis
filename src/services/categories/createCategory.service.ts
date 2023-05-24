import { Repository } from 'typeorm'
import { AppDataSource } from '../../data-source'
import { Category } from '../../entities'
import { AppError } from '../../errors'
import { iCategory, iCreateCategory } from '../../interfaces/categories.interfaces'

const createCategoryService = async (categoryData: iCreateCategory): Promise<iCategory> => {

    const categoriesRepository: Repository<Category> = AppDataSource.getRepository(Category)

    const findCategory: Category | null = await categoriesRepository.findOne({
        where: {
            name: categoryData.name
        }
    })

    if(findCategory){
        throw new AppError('Category already exists', 409)
    }

    const category: Category = categoriesRepository.create(categoryData)

    await categoriesRepository.save(category)

    return category

}

export default createCategoryService