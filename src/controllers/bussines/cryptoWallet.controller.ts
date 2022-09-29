import { closeConnectionInMongoose } from './../../libs/constants';
import { Request, Response } from "express";
import User from "../../models/User"
import Crypto from "../../models/Crypto"

export const createFiatWallet = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.userId)
        const chat = await Crypto.findOne({
            members: { $all: [req.userId, req.body.recivedId] }
        })

        if (chat !== undefined && chat !== null) {
            res.status(200).json({ message: "el chat ya existe boludín:", chat })
            return closeConnectionInMongoose
        }

        else {
            const newChat = new Crypto({ members: [req.body.senderId, req.body.recivedId] })
            const result = await newChat.save()
            const chatId = result?._id
            if (user != undefined) user.chats = user.chats.concat(chatId)
            await user.save()
            res.status(200).json(result)
            return closeConnectionInMongoose
        }

    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
}

export const getProfileById = async (
    req: Request<unknown, unknown, unknown>,
    res: Response) => {
    try {
        const profileData = await User.findById(req.userId, { password: 0 })

        const myId = req.userId?.toString()
        if (profileData !== undefined) {
            profileData.visits = profileData.visits.concat(myId)
        }
        await profileData.save()

        res.status(200).json({ profileData, myId })
        return closeConnectionInMongoose
    } catch (error) {
        console.log("Cannot get profile", error)
        return res.status(404).json(error)
    }
}

export const updateProfile = async (
    req: Request<unknown, unknown, unknown>,
    res: Response) => {
    try {
    } catch (error) {
        console.log("Error:", error)
        res.status(500).json(error)
    }
}
