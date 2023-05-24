import { Request, Response } from 'express'
import { iAllRealEstate, iCreateRealEstate, iRealEstate, iRealEstateWithoutAddress } from '../interfaces/realEstate.interfaces'
import createRealEstateService from '../services/realEstate/createRealEstate.service'
import listAllRealEstateService from '../services/realEstate/listAllRealEstate.service'

const createRealEstateController = async (req: Request, res: Response): Promise<Response> => {

    const realEstateData: iCreateRealEstate = req.body

    const newRealEstate: iRealEstate | iRealEstateWithoutAddress = await createRealEstateService(realEstateData)

    return res.status(201).json(newRealEstate)
}

const listAllRealEstateController = async (req: Request, res: Response): Promise<Response> => {

    const allRealEstate: iAllRealEstate = await listAllRealEstateService()

    return res.json(allRealEstate)
}

export {
    createRealEstateController,
    listAllRealEstateController
}