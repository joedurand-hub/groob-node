import { Request, Response } from "express";
import User from '../models/User'
import Publication from '../models/Publication'
import { closeConnectionInMongoose } from "../libs/constants";
import { UpdateProfileBodyType, ValidateProfileParamsType } from "../schemas/profile.schema";


export const getProfile = async (
    req: Request<ValidateProfileParamsType, unknown, unknown>,
    res: Response) => {
    try {
        const profileData = await User.findById(req.userId, { password: 0 }).populate({
            path: 'publications',
            select: 'publications',
            options: { limit: 10 }
        })
        res.status(200).json(profileData)
        return closeConnectionInMongoose
    } catch (error) {
        console.log("Cannot get profile", error)
        return res.status(404).json(error)
    }
}

export const getAllProfiles = async (_req: Request, res: Response) => {
    try {

        const allProfiles = await User.find()
        res.status(200).json(allProfiles)
        return closeConnectionInMongoose
    } catch (error) {
        console.log(error)
        res.status(500).send('An internal server error occurred');
    }
}

export const getProfileById = async (
    req: Request<ValidateProfileParamsType, unknown, unknown>,
    res: Response) => {
    try {
        const { id } = req.params
        console.log("el aidi:", id)
        const profileData = await User.findById(id, { password: 0 })
        console.log(profileData)
        res.status(200).json(profileData)
        return closeConnectionInMongoose
    } catch (error) {
        console.log("Cannot get profile", error)
        return res.status(404).json(error)
    }
}

export const updateProfile = async (
    req: Request<ValidateProfileParamsType, unknown, UpdateProfileBodyType>,
    res: Response) => {
    try {
        const { userName, description, profilePicture } = req.body;
        const { id } = req.params
        const user = await User.findById(id, { password: 0 })
        const userUpdated = await User.findOneAndUpdate(
            { _id: user._id },
            { userName, description, profilePicture })
        res.status(200).json(userUpdated);
        return closeConnectionInMongoose
    } catch (error) {
        console.log("Error:", error)
        res.status(500).json(error)
    }
}

export const deleteProfile = async (
    req: Request<ValidateProfileParamsType, unknown, unknown>,
    res: Response) => {
    try {
        const { id } = req.params
        await User.deleteOne({ _id: id })
        res.status(200).json(`User deleted`)
        return closeConnectionInMongoose
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

export const getAllPostsByUser = async (req: Request, res: Response) => {
    // Hacer paginado cada 7 posts así en el front se realiza infinity scroll
    try {
        const user = await User.findById(req.userId)
        const posts = await Publication.find()
        const userId = user._id.toString()
        const postsByUser = posts.filter(post => {
            if (userId === post.user.toString()) {
                return post;
            }
        })
        res.status(200).json(postsByUser)
        return closeConnectionInMongoose
    } catch (error) {
        console.log(error)
        res.status(500).send('An internal server error occurred');
    }
}
