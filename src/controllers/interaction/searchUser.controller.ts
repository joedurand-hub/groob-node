import { Request, Response } from "express";
import User from '../../models/User'

export const searchUser = async (req: Request, res: Response) => {
    try {
        const { input } = req.query
        console.log(input)
        if (input === undefined || input === null || input === "") return
        else {
            let users = await User.find()
            const result = users.filter(user => {
                if (user.userName.toLowerCase().includes(input)
                    || user.description.toLowerCase().includes(input)
                    || user.firstName.toLowerCase().includes(input)
                    || user.lastName.toLowerCase().includes(input)
                    || user.email.toLowerCase().includes(input)
                ) {
                    return user
                }
            }).sort((a: any, b: any) => {
                if (a.verified < b.verified) return 1;
                if (a.verified > b.verified) return -1;
            })

            res.status(200).json(result)
            return res.status(200).json(result)
        }
    } catch (error) {
        console.log(error)
    }

}