import { Request, Response } from "express";
import mongoose from "mongoose";
import User from "../models/User";
import jwt from "jsonwebtoken"
import { LoginBodyType, SignupBodyType } from "../schemas/auth..schema";

const closeConnectionInMongoose = mongoose.connection.close();

export const signup = async (req: Request<unknown, unknown, SignupBodyType>, res: Response) => {
    try {
        const { username, password, email } = req.body
        const user = new User({ username, password, email })
        user.password = await user.encryptPassword(user.password)

        const userSaved = await user.save()
        const token: string = jwt.sign({ _id: userSaved._id }, `${process.env.TOKEN_KEY_JWT}`)
        res.header("auth-token", token).json(token);
        closeConnectionInMongoose;
        return res.redirect('/feed')
    } catch (error) {
        console.log("error:", error)
        res.status(400).json(error)
    }
}

export const login = async (req: Request<unknown, unknown, LoginBodyType>, res: Response) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) return res.status(400).json('Email or password is wrong')

        const passwordFromLogin = await user.validatePassword(password)
        if (!passwordFromLogin) return res.status(400).json('Email or password is wrong')

        const token: string = jwt.sign({ _id: user._id }, `${process.env.TOKEN_KEY_JWT}`, {
            expiresIn: 604800
        })
        res.header('auth-token', token).json(token);
        closeConnectionInMongoose;
        return res.redirect('/feed')
    } catch (error) {
        console.log("error:", error)
        res.status(400).json(error)
    }
}

// export const reset_password = async (_req: Request, res: Response) => {
//     const { email, username } = req.body
//     return {
//         from: 'henry.nftmarket@gmail.com',
//         to: email,
//         subject: `Password Reset Request`,
//         text: `Hello, ${username}. We've received a password reset request from this email address. Below we'll provide you a special link that will help you change your password. Please note that for security reasons this link will expire after 24 hours. http://localhost:3000/reset/${req.userId}`,
//     }
// }