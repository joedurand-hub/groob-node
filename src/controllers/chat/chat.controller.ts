import { Request, Response } from "express";
import Chat from "../../models/Chat"
import User from "../../models/User"
import { closeConnectionInMongoose } from "../../libs/constants";

export const createChat = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.userId)
        const chat = await Chat.findOne({
            members: { $all: [req.userId, req.body.recivedId] }
        })

        if (chat !== undefined && chat !== null) {
            res.status(200).json({ message: "el chat ya existe boludín:", chat })
            return closeConnectionInMongoose
        }

        else {
            const newChat = new Chat({ members: [req.body.senderId, req.body.recivedId] })
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


export const userChats = async (req: Request, res: Response) => {

    try {
        const user = await User.findById(req.userId)
        const chats = await Chat.find({
            members: { $in: [req.userId] }
        })
    

        const userName = user?.userName
        const online = user?.online
        const profilePicture = user?.profilePicture?.secure_url
        const myId = user._id.toString()

        const usersInMyChat = chats.map(obj => obj.members).flat()
        const usersId = usersInMyChat.filter(member => member !== myId)
        
        const allMyChats = await User.find({ // busco los usuarios con los que tengo chats
            _id: {
                $in: usersId
            }
        })

        const chatIdAndUserId = chats.map(user => { // para saber con quien es el chat
            return {
                id: user._id.toString(),
                member: user.members,
            }
        })
        
        const usersDataInTheChat = allMyChats.map(user => { // para renderizar los datos
            return {
                id: user._id.toString(),
                userName: user.userName,
                profilePicture: user.profilePicture.secure_url,
                online: user.online,
            }
        })
        

        res.status(200).json({ chatIdAndUserId, usersDataInTheChat, userName, profilePicture, online, myId })

        return closeConnectionInMongoose
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}


export const findChat = async (req: Request, res: Response) => {
    try {
        const myId = req.userId?.toString()
        const chat = await Chat.findOne({
            members: { $all: [req.userId, req.params.secondId] }
        })
        const user = await User.findById(req.params.secondId)
        const userName = user?.userName
        const profilePicture = user?.profilePicture?.secure_url
        const online = user?.online
        closeConnectionInMongoose
        res.status(200).json({ chat, userName, profilePicture, online, myId })

    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}
