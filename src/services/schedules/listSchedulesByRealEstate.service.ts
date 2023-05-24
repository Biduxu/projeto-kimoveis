import { AppDataSource } from '../../data-source'
import { Repository } from 'typeorm'
import { RealEstate } from '../../entities'
import { AppError } from '../../errors'

const listSchedulesByRealEstateService = async (realEstateId: number): Promise<RealEstate | null> => {

    const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate)

    const findRealEstate: RealEstate | null = await realEstateRepository.findOne({
        where: {
            id: realEstateId
        }
    })

    if(!findRealEstate){
        throw new AppError('RealEstate not found', 404)
    }

    const schedulesByRealEstate: RealEstate | null = await AppDataSource.createQueryBuilder(RealEstate, 'real_estate').
    innerJoinAndSelect('real_estate.address', 'addresses').
    innerJoinAndSelect('real_estate.category', 'categories').
    innerJoinAndSelect('real_estate.schedules', 'schedules_users_properties').
    innerJoinAndSelect('schedules_users_properties.user', 'users').
    where('schedules_users_properties.realEstate = :realEstateId', {realEstateId}).
    getOne()

    return schedulesByRealEstate

}

export default listSchedulesByRealEstateService