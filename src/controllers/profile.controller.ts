import { Request, Response } from "express";
import User from '../models/User'
import mongoose from "mongoose";
import { UpdateProfileBodyType, ValidateProfileParamsType } from "../schemas/profile.schema";

const closeConnectionInMongoose = mongoose.connection.close();

export const get_profile = async (
    req: Request<ValidateProfileParamsType, unknown, unknown>, 
    res: Response) => {
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

export const get_all_profiles = async (_req: Request, res: Response) => {
    try {
        
        const allProfiles = await User.find()
        res.status(200).json(allProfiles)
        return closeConnectionInMongoose
    } catch (error) {
        console.log(error)
        res.status(500).send('An internal server error occurred');
    }
}

export const get_profile_by_id = async (
    req: Request<ValidateProfileParamsType, unknown, unknown>, 
    res: Response) => {
    try {
        const { id } = req.params
        const profileData = await User.findById(id, { password: 0 })
        console.log("profileById:", profileData)
        res.status(200).json(profileData)
        return closeConnectionInMongoose
    } catch (error) {
        console.log("Cannot get profile", error)
        return res.status(404).json(error)
    }
}


export const update_profile = async (
    req: Request<ValidateProfileParamsType, unknown, UpdateProfileBodyType>, 
    res: Response) => {
    try {
        const { userName, description, profile_picture } = req.body;
        const { id } = req.params
        const user = await User.findById(id, { password: 0 })
        const userUpdated = await User.findOneAndUpdate(
            {_id: user._id}, 
            { userName, description, profile_picture })
        res.status(200).json(userUpdated);
        return closeConnectionInMongoose
    } catch (error) {
        console.log("Error:", error)
        res.status(500).json(error)
    }
}

export const delete_profile = async (
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
