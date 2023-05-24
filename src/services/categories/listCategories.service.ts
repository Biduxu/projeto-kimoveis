import { Repository } from 'typeorm'
import { AppDataSource } from '../../data-source'
import { Category } from '../../entities'
import { iAllCategories } from '../../interfaces/categories.interfaces'

const listCategoriesService = async (): Promise<iAllCategories> => {

    const categoriesRepository: Repository<Category> = AppDataSource.getRepository(Category)

    const categories: Category[] = await categoriesRepository.find()

    return categories

}

export default listCategoriesService