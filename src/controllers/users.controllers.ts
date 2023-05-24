import { Request, Response } from 'express'
import { iAllUsers, iCreateUser, iUpdateUserPartial, iUserWithoutPassword } from '../interfaces/users.interfaces'
import createUserService from '../services/users/createUser.service'
import deleteUserService from '../services/users/deleteUser.service'
import listUsersService from '../services/users/listUsers.service'
import updateUserService from '../services/users/updateUser.service'

const createUserController = async (req: Request, res: Response): Promise<Response> => {

    const createUserData: iCreateUser = req.body

    const newUser: iUserWithoutPassword = await createUserService(createUserData)

    return res.status(201).json(newUser)
}

const listUsersController = async (req: Request, res: Response): Promise<Response> => {

    const users: iAllUsers = await listUsersService()

    return res.json(users)
}

const updateUserController = async (req: Request, res: Response): Promise<Response> => {

    const userId: number = parseInt(req.params.id)
    const updateData: iUpdateUserPartial = req.body
    
    const updateUser: iUserWithoutPassword = await updateUserService(updateData, userId)

    return res.status(200).json(updateUser)
}

const deleteUserController = async (req: Request, res: Response): Promise<Response> => {

    const userId: number = parseInt(req.params.id)
    
    await deleteUserService(userId)

    return res.status(204).send()
}

export {
    createUserController,
    listUsersController,
    updateUserController,
    deleteUserController
}