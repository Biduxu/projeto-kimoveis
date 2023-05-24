import { Request, Response, NextFunction } from 'express'
import { Repository } from 'typeorm'
import { AppDataSource } from '../data-source'
import { User } from './../entities'
import { AppError } from '../errors'

const verifyEmailExistsMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

    if(!req.body.email){
        return next()
    }

    const userRepository: Repository<User> = AppDataSource.getRepository(User)

    const findUser: User | null = await userRepository.findOne({
        where: {
            email: req.body.email
        }
    })

    if(findUser){
        throw new AppError('Email already exists', 409)
    }

    return next()
}

export default verifyEmailExistsMiddleware
