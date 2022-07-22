import { Request, Response } from "express";
import User from "../models/User";
import mongoose from "mongoose";

const closeConnectionInMongoose = mongoose.connection.close();

export const follow = async (req: Request, res: Response) => {
    try {
        const { sigo_a } = req.body;
        const my_user = await User.findById(req.userId)
        if (my_user != undefined) {
            my_user.followings = my_user.followings.concat(sigo_a)
        }
        await my_user.save()
        const user_with_new_follower = await User.findById(sigo_a)
        if (user_with_new_follower != undefined) {
            user_with_new_follower.followers = user_with_new_follower.followers.concat(my_user?._id)
        }
        await user_with_new_follower.save()
        closeConnectionInMongoose
        res.json(true)

    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}

export const unfollow = async (req: Request, res: Response) => {
    try {
        const { id_del_usuario_a_dejar_de_seguir } = req.body;
        const my_user = await User.findById(req.userId)
        if (my_user !== undefined) {
            my_user.followings = my_user.followings.filter((id) => id !== id_del_usuario_a_dejar_de_seguir)
        }
        await my_user.save()
        const el_otro_usuario = await User.findById(id_del_usuario_a_dejar_de_seguir)
        if (el_otro_usuario !== undefined) {
            el_otro_usuario.followers = el_otro_usuario.followings.filter((id) => id !== my_user?._id)
        }
        await el_otro_usuario.save()
        closeConnectionInMongoose
        res.json({ done: true })
    }
    catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}

export const get_followers = async (req: Request, res: Response) => {
    try {
        const my_user = await User.findById(req.userId)
        const followers = my_user.followers
        console.log("followers:", followers)
        closeConnectionInMongoose
        res.json({ done: true, followers })
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}

export const get_followings = async (req: Request, res: Response) => {
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