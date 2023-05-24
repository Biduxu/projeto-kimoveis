import { Repository } from 'typeorm'
import { AppDataSource } from '../../data-source'
import { RealEstate, Schedule, User } from '../../entities'
import { AppError } from '../../errors'
import { iCreateSchedule, iFinalSchedule } from '../../interfaces/schedules.interfaces'

const createScheduleService = async (userId: number, scheduleData: iCreateSchedule): Promise<string> => {

    const schedulesRepository: Repository<Schedule> = AppDataSource.getRepository(Schedule)
    const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate)
    const userRepository: Repository<User> = AppDataSource.getRepository(User)

    const findRealEstate: RealEstate | null = await realEstateRepository.findOne({
        where: {
            id: scheduleData.realEstateId
        }
    })

    if(!findRealEstate){
        throw new AppError('RealEstate not found', 404)
    }

    const realEstateId: number = scheduleData.realEstateId

    const date: Date = new Date(`${scheduleData.date} ${scheduleData.hour}`)

    let year: number = date.getFullYear()
    let month: number = date.getMonth()
    let day: number = date.getUTCDate()
    let hour: number = date.getHours()
    let minutes: number = date.getMinutes()

    let verifyWeekend: number = date.getDay()

    month = (month + 1)

    if(verifyWeekend === 0 || verifyWeekend === 6){
        throw new AppError('Invalid date, work days are monday to friday')
    }

    if(hour < 8 || hour > 18){
        throw new AppError('Invalid hour, available times are 8AM to 18PM')
    }

    if(!year || !month || !day || !hour || !minutes){
        throw new AppError('Invalid date')
    }

    const dateString: string = `${year}-${month}-${day}`
    const hourString: string = `${hour}:${minutes}`

    const realEstateBySchedule: Schedule | null = await AppDataSource.createQueryBuilder(Schedule, 'schedule').
    leftJoinAndSelect('schedule.realEstate', 'real_estate').
    where('schedule.realEstate.id = :realEstateId', {realEstateId}).
    getOne()
    
    const userBySchedule: Schedule | null = await AppDataSource.createQueryBuilder(Schedule, 'schedule').
    leftJoinAndSelect('schedule.user', 'users').
    where('schedule.user.id = :userId', {userId}).
    getOne()
    
    if(realEstateBySchedule){
        throw new AppError('Schedule to this real estate at this date and time already exists', 409)
    }

    if(userBySchedule){
        throw new AppError('User schedule to this real estate at this date and time already exists', 409)
    }

    const findUser: User | null = await userRepository.findOne({
        where: {
            id: userId
        }
    })

    const returnSchedule: iFinalSchedule = {
        date: dateString,
        hour: hourString,
        realEstate: findRealEstate,
        user: findUser!
    }

    const newSchedule: iFinalSchedule = schedulesRepository.create(returnSchedule)
    await schedulesRepository.save(newSchedule)

    return "Schedule created"

}

export default createScheduleService