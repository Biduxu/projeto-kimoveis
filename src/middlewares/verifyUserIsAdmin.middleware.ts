import { Request, Response, NextFunction } from 'express'
import { AppError } from '../errors'

const verifyUserIsAdminMiddleware = (req: Request, res: Response, next: NextFunction): Response | void => {

    if(req.params.id && req.baseUrl !== '/schedules'){
        const id: number = parseInt(req.params.id)
        
        if(id === req.user.id){
            return next()
        }
    }

    if(!req.user.admin){
        throw new AppError('Insufficient permission', 403)
    }

    return next()

}

export default verifyUserIsAdminMiddleware