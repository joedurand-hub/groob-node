import { RequestHandler, Request, Response } from "express";
import User from '../models/User'


export const getAllUsers: RequestHandler = async (_req: Request, res: Response) => {
    res.send('Obteniendo todos los usuarios')
}

export const getUser: RequestHandler = async (req: Request, res: Response) => {
    const { token } = req.params;
    try {
        const profile = await User.findOne({token})
        console.log("profile:", profile)
        return res.json(profile)

    } catch(error) {
        console.log("No se pudo traer el perfil", error)
        return res.json(error)
    }
}

export const updateUser: RequestHandler = async (_req: Request, res: Response) => {
    res.json('Actualizando usuario')
}

export const deleteUser: RequestHandler = async (_req: Request, res: Response) => {
    res.json('Eliminando usuario')
}
