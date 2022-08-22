import { Request, Response } from "express";
import Message from "../../models/Message";
import Chat from "../../models/Chat"
import { closeConnectionInMongoose } from "../../libs/constants";
// import { io } from "../../app";


export const addMessage = async (req: Request, res: Response) => {
    try {
        const { chatId, senderId, text } = req.body
        const newMessage = new Message({ chatId, senderId, text })
        const result = await newMessage.save()
        const chat = await Chat.findById(chatId)
        if (chat !== undefined) {
            chat.messages = chat.messages.concat(text)
        }
        await chat.save()
        closeConnectionInMongoose
        res.status(200).json(result)

    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
}


export const getMessages = async (req: Request, res: Response) => {
    // let activeUsers = [{ userId: "", socketId: "" }]
    try {
        // io.on("connection", (socket) => {
        //     socket.on("newUserAdded", (newUserId) => {
        //         if (!activeUsers.some((user) => user?.userId === newUserId)) {
        //             activeUsers.push(
        //                 {
        //                     userId: newUserId,
        //                     socketId: socket.id
        //                 }
        //             )
        //         }
        //         console.log("users connected", activeUsers)
        //         io.emit("getUsers", activeUsers) // send the users active
        //     })
        //     socket.on("disconnected", () => {
        //         activeUsers = activeUsers.filter((user) => user.socketId !== socket.id)
        //         console.log("user disconnected", activeUsers)
        //         io.emit("getUsers", activeUsers)
        //     })
        // })
        const myId = req.userId?.toString()

        const { chatId } = req.params
        const chat = await Message.find({ chatId })
        // const messages = chat.messages
        closeConnectionInMongoose
        res.status(200).json({ chat, myId })

    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}

