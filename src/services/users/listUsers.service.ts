import { Repository } from 'typeorm'
import { AppDataSource } from '../../data-source'
import { User } from '../../entities'
import { iAllUsers } from '../../interfaces/users.interfaces'
import { allUsersSchema } from '../../schemas/users.schemas'

const listUsersService = async (): Promise<iAllUsers> => {

    const userRepository: Repository<User> = AppDataSource.getRepository(User)

    const findUsers: User[] = await userRepository.find()
    
    const users: iAllUsers = allUsersSchema.parse(findUsers)

    return users

}

export default listUsersService