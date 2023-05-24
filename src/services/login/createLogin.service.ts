import { compare } from 'bcryptjs'
import { Repository } from 'typeorm'
import { AppDataSource } from '../../data-source'
import { User } from '../../entities'
import { AppError } from '../../errors'
import { iLogin } from '../../interfaces/login.interfaces'
import jwt from 'jsonwebtoken'

const createLoginService = async (loginData: iLogin): Promise<string> => {

    const userRepository: Repository<User> = AppDataSource.getRepository(User)

    const user: User | null = await userRepository.findOneBy({
        email: loginData.email
    })

    if(!user){
        throw new AppError('Invalid credentials', 401)
    }

    const matchPassword = await compare(loginData.password, user.password)

    if(!matchPassword){
        throw new AppError('Invalid credentials', 401)
    }

    const token: string = jwt.sign(
        {
            admin: user.admin
        },
        process.env.SECRET_KEY!,
        {
            expiresIn: '24h',
            subject: String(user.id)
        }
    )

    return token

}

export default createLoginService