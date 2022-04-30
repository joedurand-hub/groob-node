import { RequestHandler, Request, Response } from "express";
import User, { UserI } from "../models/User";
import jwt from "jsonwebtoken"

export const signup: RequestHandler = async (req: Request, res: Response) => {
    const { username, password, email } = req.body
    const user: UserI = new User({ username, password, email })
    user.password = await user.encryptPassword(user.password)

    const userSaved = await user.save()
    const token: string = jwt.sign({ _id: userSaved._id }, `${process.env.TOKEN_KEY_JWT}`)
    res.header("auth-token", token).json(userSaved)
    // En vez de retornar los datos del usuario, ya podría redireccionar 
    // a la página de inicio, la de login, o darle un alerta y que 
    // verifiquen el email
}

export const login: RequestHandler = async (req: Request, res: Response) => {
    const { email, password } = req.body
    const userToLogin = await User.findOne({ email })
    if (!userToLogin) return res.status(400).json('Email or password is wrong')

    const passwordFromLogin = await userToLogin.validatePassword(password)
    if (!passwordFromLogin) return res.status(400).json('Email or password is wrong')

    const token: string = jwt.sign({ _id: userToLogin._id }, `${process.env.TOKEN_KEY_JWT}`, {
        expiresIn: 60 * 15
    })
    return res.json(token)
}

export const reset: RequestHandler = async (_req: Request, res: Response) => {
    res.json('Actualizando Post')
}