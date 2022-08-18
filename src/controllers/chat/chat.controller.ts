import { Request, Response } from "express";
import Chat from "../../models/Chat"
import { closeConnectionInMongoose } from "../../libs/constants";


export const createChat = async (req: Request, res: Response) => {
    try {
        const newChat = new Chat({
            members: [req.body.senderId, req.body.recivedId]
        })
        const result = await newChat.save()

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
            members: {$all: [req.params.firstId, req.params.secondId]}
        })  

        closeConnectionInMongoose
        res.status(200).json(chat)

    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}
