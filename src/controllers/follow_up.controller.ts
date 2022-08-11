import { Request, Response } from "express";
import User from "../models/User";
import mongoose from "mongoose";

const closeConnectionInMongoose = mongoose.connection.close();

export const follow = async (req: Request, res: Response) => {
    try {
        const { followTo } = req.body;
        const myUser = await User.findById(req.userId)
        if (myUser != undefined) {
            myUser.followings = myUser.followings.concat(followTo)
        }
        await myUser.save()
        const userWithNewFollower = await User.findById(followTo)
        if (userWithNewFollower != undefined) {
            userWithNewFollower.followers = userWithNewFollower.followers.concat(myUser?._id)
        }
        await userWithNewFollower.save()
        closeConnectionInMongoose
        res.json(true)

    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}

export const unfollow = async (req: Request, res: Response) => {
    try {
        const { idOfTheUserToUnfollow } = req.body;
        const otherUser = await User.findById(idOfTheUserToUnfollow)
        const myUser = await User.findById(req.userId)

        if (otherUser !== undefined) {
            otherUser.followers = otherUser.followers.filter((id) => id !== myUser?._id)
        }
        await otherUser.save()
        if (myUser !== undefined) {
            myUser.followings = myUser.followings.filter((id) => id !== idOfTheUserToUnfollow)
        }
        await myUser.save()
        closeConnectionInMongoose
        res.json({ done: true })
    }
    catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}

export const getFollowers = async (req: Request, res: Response) => { // AL FIN ANDAA
    try {
        const myUser = await User.findById(req.userId)
        if (myUser !== undefined) {
            let allMyIds = myUser.followers.map((id) => id)
            const result = await User.find({ // retorna un array con los seguidores (objetos con data)
                _id: {
                    $in: allMyIds
                }
            })
            const followersData = result.map(obj => {
                return {
                    username: obj.userName,
                    picture: obj.profilePicture,
                    id: obj._id.toString()
                }
            })
            res.json({ followersData })
            closeConnectionInMongoose
        }
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}

export const getFollowings = async (req: Request, res: Response) => {
    try {
        const myUser = await User.findById(req.userId)
        if (myUser !== undefined) {
            let allMyIds = myUser.followings.map((id) => id)
            const result = await User.find({ // retorna un array con los seguidores (objetos con data)
                _id: {
                    $in: allMyIds
                }
            })
            const followingsData = result.map(obj => {
                return {
                    username: obj.userName,
                    picture: obj.profilePicture,
                    id: obj._id.toString()
                }
            })
            res.json({ followingsData })
            closeConnectionInMongoose
        }
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}