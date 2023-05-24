import { Request, Response, NextFunction } from 'express'
import { ZodTypeAny } from 'zod'

const validateDataMiddleware = (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {

    const validateData = schema.parse(req.body)

    req.body = validateData

    return next()

}

export default validateDataMiddleware