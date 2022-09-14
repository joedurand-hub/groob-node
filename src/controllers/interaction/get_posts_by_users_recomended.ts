import { RequestHandler, Request, Response } from "express";
import Publication from '../../models/Publication'
import User from '../../models/User'

export const discoverUsers: RequestHandler = async (_req: Request, res: Response) => {
    try {
        const allPublications = await Publication.find()
        const filterByPhoto = allPublications.filter(post => {
            if (post.images[0].secure_url !== undefined 
                && post.images[0].secure_url !== null 
                && post.images[0].secure_url !== "") {
                    return post;
            }
        })
        const orderByDate = filterByPhoto.sort((a: any, b: any) => {
            if (a.createdAt < b.createdAt) return 1;
            return -1;
        })
        res.status(200).json(orderByDate)
    } catch (error) {
        console.log(error)
    }
}
