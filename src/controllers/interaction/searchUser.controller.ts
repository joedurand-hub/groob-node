import { Request, Response } from "express";
import User from '../../models/User'


export const searchUser = async (req: Request, res: Response) => {
    try {
        const { userName } = req.query
        if (userName === undefined || userName === null) {
            return console.log("No hay data maestro");
        }
        let data = await User.find()
        const result = data.filter(user => {
            if(user.userName.includes(userName)) {
                return user
            }
        })
        console.log(result)
        return res.status(200).json(result)
    } catch (error) {
        console.log(error)
    }

}