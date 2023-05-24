import { Repository } from 'typeorm'
import { AppDataSource } from '../../data-source'
import { RealEstate } from '../../entities'
import { iAllRealEstate } from '../../interfaces/realEstate.interfaces'

const listAllRealEstateService = async (): Promise<iAllRealEstate> => {

    const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate)

    const findAllRealEstate: RealEstate[] = await realEstateRepository.find({
        relations: {
            address: true
        }
    })

    return findAllRealEstate

}

export default listAllRealEstateService