import { Request, Response } from 'express'
import { RealEstate } from '../entities'
import { iCreateSchedule } from '../interfaces/schedules.interfaces'
import createScheduleService from '../services/schedules/createSchedule.service'
import listSchedulesByRealEstateService from '../services/schedules/listSchedulesByRealEstate.service'

const createScheduleController = async (req: Request, res: Response): Promise<Response> => {

    const userId: number = req.user.id
    const scheduleData: iCreateSchedule = req.body

    const message: string = await createScheduleService(userId, scheduleData)

    return res.status(201).json({
        message: message
    })
}

const listSchedulesByRealEstateController = async (req: Request, res: Response): Promise<Response> => {

    const realEstateId: number = parseInt(req.params.id)

    const listSchedulesByRealEstate: RealEstate | null = await listSchedulesByRealEstateService(realEstateId)

    return res.json(listSchedulesByRealEstate)
}

export {
    createScheduleController,
    listSchedulesByRealEstateController
}