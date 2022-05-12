import { RequestHandler, Request, Response } from "express";
// import Publication, { PublicationI } from '../models/Publication'
import User from '../../models/User'


export const search_user: RequestHandler = async (req: Request, res: Response) => {
    try {
        const { username } = req.query
        if (username === undefined || username === null) {
            return console.log("No hay data maestro");
          }
        let data = await User.find()
        const result = data.filter(user => {
            if(user.username === username) {
                return user
            }
        })
        console.log(result)
        return res.status(200).json(result)
    } catch (error) {
        console.log(error)
    }

}