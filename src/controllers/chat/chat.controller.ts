import { closeConnectionInMongoose } from './../../libs/constants';
import { Request, Response } from "express";
import Chat from "../../models/Chat"
import User from "../../models/User"

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
        const verified = user?.verified

        const usersInMyChat = chats.map(obj => obj.members).flat()
        const usersId = usersInMyChat.filter(member => member !== myId)

        const allMyChats = await User.find({ // busco los usuarios con los que tengo chats
            _id: {
                $in: usersId
            }
        })
        
        console.log(chats)
        
        const chatIdAndUserId = chats.map(chat => { // para saber con quien es el chat
            return {
                id: chat._id.toString(),
                member: chat.members,
                updated: chat.updated,
            }
        })
        
        const usersDataInTheChat = allMyChats.map(user => { // para renderizar los datos
            return {
                id: user._id.toString(),
                userName: user.userName,
                profilePicture: user.profilePicture.secure_url,
                online: user.online,
                verified: user.verified,
                updated: user.updatedAt
            }
        })
        console.log(usersDataInTheChat)


        res.status(200).json({ chatIdAndUserId, usersDataInTheChat, userName, profilePicture, verified, online, myId })

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
