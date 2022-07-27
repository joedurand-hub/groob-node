import { Request, Response } from "express";
import mongoose from "mongoose";
import User from '../../models/User'

const closeConnectionInMongoose = mongoose.connection.close();

// export const get_all_posts_by_followings = async (req: Request, res: Response) => {
//     try {
//         const myUser = await User.findById(req.userId)
//         // const followings = myUser.followings
//         // const postsByFollowings = followings.map((userID) => {
//         //     const users_que_sigo = User.findById(userID)
//         //     return users_que_sigo
//         // })

//         // console.log("postsByFollowings:", postsByFollowings)
//         res.json({ done: true, myUser  })
//         return closeConnectionInMongoose;

//     } catch (error) {
//         console.log(error)
//         res.status(400).json(error)
//     }
// }


export const getAllPostsByFollowings = async (req: Request, res: Response) => {
    try {
        const profileData = await User.findById(req.userId, { password: 0 }).populate({
            path: 'publications',
            select: 'publications',
            options: { limit: 10 }
        })
        console.log("profile:", profileData)
        res.status(200).json(profileData)
        return closeConnectionInMongoose
    } catch (error) {
        console.log("Cannot get profile", error)
        return res.status(404).json(error)
    }
}