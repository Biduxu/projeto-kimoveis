import { Repository } from 'typeorm'
import { Request, Response, NextFunction } from 'express'
import { User } from '../entities'
import { AppDataSource } from '../data-source'
import { AppError } from '../errors'

const verifyUserExists = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

    const userId: number = parseInt(req.params.id)

    const userRepository: Repository<User> = AppDataSource.getRepository(User)

    const findUser = await userRepository.findOne({
        where: {
            id: userId
        }
    })

    if(!findUser){
        throw new AppError('User not found', 404)
    }

    return next()
}

export default verifyUserExists