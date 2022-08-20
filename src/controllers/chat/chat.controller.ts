import { Request, Response } from "express";
import Chat from "../../models/Chat"
import User from "../../models/User"
import { closeConnectionInMongoose } from "../../libs/constants";


export const createChat = async (req: Request, res: Response) => {
    try {
        // const user = await User.findById(req.userId)

        const newChat = new Chat({
            members: [req.body.senderId, req.body.recivedId]
        })
        const result = await newChat.save()
        // const chatId = result?._id
        // if (user != undefined) {
        //     user.chats = user.chats.concat(chatId)
        // }
        // await user.save()
        closeConnectionInMongoose
        res.status(200).json(result)

    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
}


export const userChats = async (req: Request, res: Response) => {
    try {
        const chat = await Chat.find({
            members: {$in: [req.params.userId]}
        })

        closeConnectionInMongoose
        res.status(200).json(chat)

    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}


export const findChat = async (req: Request, res: Response) => {
    try {
        const chat = await Chat.findOne({
            members: {$all: [req.userId, req.params.secondId]}
        })  
        const user = await User.findById(req.params.secondId)
        const userName = user?.userName
        const profilePicture = user?.profilePicture?.secure_url
        closeConnectionInMongoose
        res.status(200).json({chat, userName, profilePicture})

    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}
