import { Request, Response } from "express";
import User from '../../models/User'
import { closeConnectionInMongoose } from "../../libs/constants";

export const searchUser = async (req: Request, res: Response) => {
    try {
        const { input } = req.query
        console.log(input)
        if (input === undefined || input === null || input === "") return
        else {
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
        return res.status(200).json(result)
    }
    return closeConnectionInMongoose;
    } catch (error) {
        console.log(error)
    }

}