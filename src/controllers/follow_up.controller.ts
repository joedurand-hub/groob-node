import { Request, Response } from "express";
import User from "../models/User";
import mongoose from "mongoose";

const closeConnectionInMongoose = mongoose.connection.close();

export const follow = async (req: Request, res: Response) => {
    try {
        const { sigo_a } = req.body;
        const myUser = await User.findById(req.userId)
        if (myUser != undefined) {
            myUser.followings = myUser.followings.concat(sigo_a)
        }
        await myUser.save()
        const userWithNewFollower = await User.findById(sigo_a)
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
        if (otherUser !== undefined) {
            otherUser.followers = otherUser.followings.filter((id) => id !== myUser?._id)
        }
        await otherUser.save()
        const myUser = await User.findById(req.userId)
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

export const getFollowers = async (req: Request, res: Response) => {
    try {
        const myUser = await User.findById(req.userId)
        const followers = myUser.followers
        console.log("followers:", followers)
        closeConnectionInMongoose
        res.json({ done: true, followers })
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}

export const getFollowings = async (req: Request, res: Response) => {
    try {
        const myUser = await User.findById(req.userId)
        const followings = myUser.followings
        console.log("followings:", followings)
        closeConnectionInMongoose
        res.json({ done: true, followings })
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}