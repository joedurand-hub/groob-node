import { Request, Response } from "express";
import User from '../../models/User'


export const searchUser = async (req: Request, res: Response) => {
    try {
        const { input } = req.query
        if (input === undefined || input === null) {
            return console.log("No hay data maestro, mostra otra cosa");
        }
        let data = await User.find()
        const result = data.filter(user => {
            if(user.userName.toLowerCase().includes(input)
            || user.description.toLowerCase().includes(input)
            || user.firstName.toLowerCase().includes(input)
            || user.lastName.toLowerCase().includes(input)
            || user.email.toLowerCase().includes(input)
            ) {
                return user
            }
        })
        console.log(result)
        return res.status(200).json(result)
    } catch (error) {
        console.log(error)
    }

}