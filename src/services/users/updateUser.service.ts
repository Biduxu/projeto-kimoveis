import { Repository } from 'typeorm'
import { AppDataSource } from '../../data-source'
import { User } from '../../entities'
import { iUpdateUserPartial, iUser, iUserWithoutPassword } from '../../interfaces/users.interfaces'
import { returnUserSchema } from '../../schemas/users.schemas'

const updateUserService = async (updateData: iUpdateUserPartial, userId: number): Promise<iUserWithoutPassword> => {

    const userRepository: Repository<User> = AppDataSource.getRepository(User)

    const oldUserData: User | null = await userRepository.findOneBy({
        id: userId
    })

    const user: User = userRepository.create({
        ...oldUserData,
        ...updateData
    })
    
    await userRepository.save(user)

    const updateUser: iUserWithoutPassword = returnUserSchema.parse(user)

    return updateUser

}

export default updateUserService