import { RequestHandler, Request, Response } from "express";
import Publication from '../../models/Publication'
import User from '../../models/User'
import { closeConnectionInMongoose } from "../../libs/constants";
export const discoverUsers: RequestHandler = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.userId)
        const allPublications = await Publication.find()
        if (user.explicitContent === true) {
            const filterByPhoto = allPublications.filter(post => {
                if (post.images.length > 0) {
                    return post;
                }
            })
            const orderByDate = filterByPhoto.sort((a: any, b: any) => {
                if (a.createdAt < b.createdAt) return 1;
                return -1;
            })
            res.status(200).json(orderByDate)

        } else {
            const filterByExplicitContentAndImages = allPublications.filter
                (post => post.explicitContent === false && post.images.length > 0)
            const orderByDate = filterByExplicitContentAndImages.sort((a: any, b: any) => {
                if (a.createdAt < b.createdAt) return 1;
                return -1;
            })
            res.status(200).json(orderByDate)
        }
        return closeConnectionInMongoose;
    } catch (error) {
        console.log(error)
    }
}
