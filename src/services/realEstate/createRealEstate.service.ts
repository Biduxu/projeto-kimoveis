import { Repository } from 'typeorm'
import { AppDataSource } from '../../data-source'
import { Address, Category, RealEstate } from '../../entities'
import { AppError } from '../../errors'
import { iCreateAddress } from '../../interfaces/addresses.interfaces'
import { iCreateFullRealEstate, iCreateRealEstate, iRealEstate, iRealEstateWithoutAddress } from '../../interfaces/realEstate.interfaces'
import { returnRealEstateSchema, returnRealEstateWithoutNumberAddressSchema } from '../../schemas/realEstate.schemas'

const createRealEstateService = async (realEstateData: iCreateRealEstate): Promise<iRealEstate | iRealEstateWithoutAddress> => {

    const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate)
    const addressesRepository: Repository<Address> = AppDataSource.getRepository(Address)
    const categoriesRepository: Repository<Category> = AppDataSource.getRepository(Category)

    const address: iCreateAddress = realEstateData.address

    const findAddress: Address | null = await addressesRepository.findOne({
        where: {
            street: address.street,
            state: address.state,
            zipCode: address.zipCode,
            city: address.city
        }
    })

    if(findAddress){
        throw new AppError('Address already exists', 409)
    }

    const newAddress: Address = addressesRepository.create({
        street: address.street,
        state: address.state,
        zipCode: address.zipCode,
        city: address.city,
        number: address.number!
    })
    
    await addressesRepository.save(newAddress)

    const realEstateFinalData: iCreateFullRealEstate = {
        value: realEstateData.value,
        size: realEstateData.size,
        sold: false,
        address: newAddress.id,
        category: realEstateData.category
    }

    const findAddressNewRealEstate: Address | null = await addressesRepository.findOne({
        where: {
            id: realEstateFinalData.address
        }
    })

    const findCategoryNewRealEstate: Category | null = await categoriesRepository.findOne({
        where: {
            id: realEstateFinalData.category!
        }
    })
    
    const newRealEstate: RealEstate = realEstateRepository.create({
        value: realEstateFinalData.value,
        size: realEstateFinalData.size,
        sold: realEstateFinalData.sold,
        address: findAddressNewRealEstate!,
        category: findCategoryNewRealEstate!
    })
    
    await realEstateRepository.save(newRealEstate)

    if(newRealEstate.address.number === null){
        newRealEstate.category.id = 2
        newRealEstate.category.name = 'category1'

        const realEstate: iRealEstateWithoutAddress = returnRealEstateWithoutNumberAddressSchema.parse(newRealEstate)
        
        return realEstate
    }
    
    const realEstate: iRealEstate = returnRealEstateSchema.parse(newRealEstate)

    return realEstate

}

export default createRealEstateService