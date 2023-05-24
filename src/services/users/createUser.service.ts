import { Repository } from 'typeorm'
import { AppDataSource } from '../../data-source'
import { User } from '../../entities'
import { iCreateUser, iUserWithoutPassword } from '../../interfaces/users.interfaces'
import { returnUserSchema } from '../../schemas/users.schemas'

const createUserService = async (createUserData: iCreateUser): Promise<iUserWithoutPassword> => {

    const userRepository: Repository<User> = AppDataSource.getRepository(User)

    const user = userRepository.create(createUserData)
    await userRepository.save(user)

    const newUser: iUserWithoutPassword = returnUserSchema.parse(user)

    return newUser

}

export default createUserService