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
        const chat = await Chat.find({
            members: { $in: [req.userId] }
        })

        const userName = user?.userName
        const online = user?.online
        const profilePicture = user?.profilePicture?.secure_url
        const myId = user._id.toString()

        const usersInMyChat = chat.map(obj => obj.members)
        const membersId = usersInMyChat.map(member => member[1])
        const usersId = membersId.filter(id => id !== myId)

        const allMyChats = await User.find({
            _id: {
                $in: usersId
            }
        })

        const chatIdAndUserId = chat.map(user => {
            return {
                id: user._id.toString(),
                member: user.members[1],
            }
        })

        const usersDataInTheChat = allMyChats.map(user => {
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
