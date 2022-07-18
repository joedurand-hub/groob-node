import { Request, Response } from "express";
import User from "../models/User";
import mongoose from "mongoose";
import Follower from "../models/Follower";
import Following from "../models/Following";

const closeConnectionInMongoose = mongoose.connection.close();

export const follow = async (req: Request, res: Response) => {
    try {
        const { sigo_a } = req.body;
        const my_user = await User.findById(req.userId)
        const following = new Following({ following: sigo_a, user: my_user?._id })

        const following_saved = await following.save()
        const add_new_following = following_saved?._id

        if (my_user != undefined) {
            my_user.followings = my_user.followings.concat(add_new_following)
        }
        await my_user.save()

        const user_with_new_follower = await User.findById(sigo_a)
        const follower = new Follower({ follower: req.userId, user: sigo_a })

        const follower_saved = await follower.save()
        const add_new_follower = follower_saved?._id

        if (user_with_new_follower != undefined) {
            user_with_new_follower.followers = user_with_new_follower.followers.concat(add_new_follower)
        }
        await user_with_new_follower.save()
        closeConnectionInMongoose
        res.json(true)

    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}

export const get_follows = async (req: Request, res: Response) => {
    try {
        const my_user = await User.findById(req.userId)
        const followings = my_user.followings
        console.log("followings:", followings)
        closeConnectionInMongoose
        res.json({ done: true, followings })

    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}

export const unfollow = async (req: Request, res: Response) => {
    try {
        const { id_del_usuario_a_dejar_de_seguir } = req.body;
        const id = req.userId
        const theOtherUser = await User.findById(id_del_usuario_a_dejar_de_seguir)
        const your_follows = theOtherUser.followers
        const followersDetheOther = await Follower.find({ _id: { $eq: your_follows } })
        const miUserEntreLosFollowers = followersDetheOther
            .find(user => user.follower === id)
        theOtherUser.followers.pull(miUserEntreLosFollowers._id)
        await theOtherUser.save()
        await Follower.findByIdAndDelete(miUserEntreLosFollowers._id)
        const my_user = await User.findById(req.userId)
        const my_follows = my_user.followings
        const followingsMios = await Following.find({ _id: { $eq: my_follows } })
        const suUserEntreMisFollowings = followingsMios
            .find(user => user.following === id_del_usuario_a_dejar_de_seguir)
        my_user.followings.pull(suUserEntreMisFollowings._id)
        await my_user.save()
        await Following.findByIdAndDelete(suUserEntreMisFollowings._id)
        closeConnectionInMongoose
        res.json({ done: true })
    }
    catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}