import { Request, Response } from "express";
import mongoose from "mongoose";
import {serialize} from "cookie"
import User from "../models/User";
import jwt from "jsonwebtoken"
import { LoginBodyType, SignupBodyType } from "../schemas/auth..schema";

const closeConnectionInMongoose = mongoose.connection.close();

export const signup = async (req: Request<unknown, unknown, SignupBodyType>, res: Response) => {
    try {
        const { userName, password, email } = req.body
        const userNameExist = await User.findOne({ userName })
        if (userNameExist) {
            return res.json("The username is already in use.")
        }
        const emailExist = await User.findOne({ email })
        if (emailExist) {
            return res.json("The email is already in use.")
        }
        else {
            if(password.length >= 6 && password.length < 16) {
                const user = new User({ userName, password, email })
                user.password = await user.encryptPassword(user.password)
                user.profilePicture.secure_url = "https://res.cloudinary.com/groob/image/upload/v1661108370/istoremovebg-preview_hzebg1.png"
                const userSaved = await user.save()
                const token: string = jwt.sign({ _id: userSaved._id }, `${process.env.TOKEN_KEY_JWT}`, {
                    expiresIn: 1204800
                })
                user.online = true
                await user.save()
                res.cookie('authtoken', token, {
                    maxAge: 604800,
                    httpOnly: true, // Para consumir sólo en protocolo HTTP
                    sameSite: 'none',
                    secure: true,
                })
                res.status(200).json({ message: 'Success' })
            }
        }
    } catch (error) {
        console.log("error:", error)
        res.status(400).json(error)
    }
}

export const login = async (req: Request<unknown, unknown, LoginBodyType>, res: Response) => {
    try {
        const { email, userName, password } = req.body
        if (email !== undefined && email.length > 0 && password.length > 0) {
            const user = await User.findOne({ email })
            const passwordFromLogin = await user.validatePassword(password)
            if (!passwordFromLogin) return res.status(400).json('Email or password is wrong')
            user.online = true
            const token: string = jwt.sign({ _id: user._id }, `${process.env.TOKEN_KEY_JWT}`, {
                expiresIn: 604800
            })
            res.setHeader('Set-cookie', serialize("authtoken", token, {
                maxAge: 604800,
                httpOnly: true, 
                sameSite: 'none',
                secure: true,
            }))
            res.status(200).json({ message: 'Success' })
            await user.save()
            return closeConnectionInMongoose;
        }
        if (userName !== undefined && userName.length > 0 && password.length > 0) {
            const user = await User.findOne({ userName })
            const passwordFromLogin = await user.validatePassword(password)
            if (!passwordFromLogin) return res.status(400).json('Email or password is wrong')
            user.online = true
            const token: string = jwt.sign({ _id: user._id }, `${process.env.TOKEN_KEY_JWT}`, {
                expiresIn: 604800
            })
            res.cookie('authtoken', token, {
                maxAge: 604800,
                httpOnly: true, 
                sameSite: 'none',
                secure: true,
            })
            res.status(200).json({ message: 'Success' })
            await user.save()
        }

    } catch (error) {
        console.log("error:", error)
        res.status(400).json(error)
    }
}

export const logout = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.userId)
        user.online = false
        await user.save()
        res.clearCookie('authtoken');
        res.send('Cookie deleted');
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}


// export const reset_password = async (_req: Request, res: Response) => {
//     const { email, userName } = req.body
//     return {
//         from: 'henry.nftmarket@gmail.com',
//         to: email,
//         subject: `Password Reset Request`,
//         text: `Hello, ${userName}. We've received a password reset request from this email address. Below we'll provide you a special link that will help you change your password. Please note that for security reasons this link will expire after 24 hours. http://localhost:3000/reset/${req.userId}`,
//     }
// }