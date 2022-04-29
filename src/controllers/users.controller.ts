import { RequestHandler, Request, Response } from "express";
import User, { UserI } from '../models/User'

export const createUser: RequestHandler = async (req: Request, res: Response) => {    
    const { username, password, email } = req.body
    const user: UserI = new User({ username, password, email })
    console.log(user)

    const userSaved = await user.save()
    console.log('nuevo usuario:', userSaved)
    res.status(201).json(userSaved)
}

export const getAllUsers: RequestHandler = async (_req: Request, res: Response) => {
    res.send('Obteniendo todos los usuarios')
}

export const getUser: RequestHandler = async (_req: Request, res: Response) => {
    res.json('Obteniendo 1 usuario')
}

export const updateUser: RequestHandler = async (_req: Request, res: Response) => {
    res.json('Actualizando usuario')
}

export const deleteUser: RequestHandler = async (_req: Request, res: Response) => {
    res.json('Eliminando usuario')
}
