import { AppDataSource } from '../../data-source'
import { Category } from '../../entities'

const listRealEstateByCategoryService = async (categoryId: number): Promise<any> => {

    const realEstateByCategory: Category | null = await AppDataSource.createQueryBuilder(Category, 'categories').
    innerJoinAndSelect('categories.realEstate', 'real_estate').
    where('real_estate.category = :categoryId', {categoryId}).
    getOne()
    
    return realEstateByCategory
}

export default listRealEstateByCategoryService