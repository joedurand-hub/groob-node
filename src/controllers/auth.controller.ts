import { RequestHandler, Request, Response } from "express";
// import mongoose from "mongoose";
import User, { UserI } from "../models/User";
import jwt from "jsonwebtoken"


export const signup: RequestHandler = async (req: Request, res: Response) => {
    const { username, password, email } = req.body
    const user: UserI = new User({ username, password, email })
    user.password = await user.encryptPassword(user.password)

    const userSaved = await user.save()
    const token: string = jwt.sign({ _id: userSaved._id }, `${process.env.TOKEN_KEY_JWT}`)
            // mongoose.connection.close()
    res.header("auth-token", token).json(userSaved)
}

export const login: RequestHandler = async (req: Request, res: Response) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json('Email or password is wrong')
    
    const passwordFromLogin = await user.validatePassword(password)
    if (!passwordFromLogin) return res.status(400).json('Email or password is wrong')

    const token: string = jwt.sign({ _id: user._id }, `${process.env.TOKEN_KEY_JWT}`, {
        expiresIn: 604800
    })
    // mongoose.connection.close()
    console.log("token", token)
    return res.header('auth-token', token).json(user)
}

export const reset: RequestHandler = async (_req: Request, res: Response) => {
    res.json('Actualizando Post')
}